import { ComponentFunc, ElementType } from './createElement'
import Component from './Component'
import { pushComponent, popComponent, removeComponent } from './hooks'

export interface DomNode {
  type: ElementType
  props: Props & {
    children?: DomNode[]
  }
}

export interface Props {
  [key: string]: any
}

interface TrackedElement extends Element {
  __component?: Component
}

export const render = (node: DomNode, parent: HTMLElement): void => {
  console.debug('--- render ---')
  while (parent.hasChildNodes()) {
    parent.lastChild && parent.removeChild(parent.lastChild)
  }
  const el = patch(node, parent, undefined)
  parent.appendChild(el)
}

const patchChildren = (node: DomNode, element: Node) => {
  if (!(element instanceof HTMLElement)) {
    return []
  }
  const children: Node[] = []
  if (node.props.children instanceof Array) {
    node.props.children.forEach((n, i) => {
      const e = element.childNodes[i]
      patch(n, element, e)
    })
  }
  return children
}

export const update = (component: Component) => {
  console.debug('--- render ---')
  const { node, element, parent } = component
  if (!node) {
    throw new Error(`component node was missing`)
  }
  if (!element) {
    throw new Error(`component element for node ${node}`)
  }
  if (!parent) {
    throw new Error(`component parent for node ${node}`)
  }
  patch(node, parent, element)
}

const updateAttributes = (node: DomNode, element: Element) => {
  const { children, prototype, ...props } = node.props
  for (const attr of element.attributes) {
    element.removeAttribute(attr.name)
  }
  for (const key of Object.keys(props)) {
    ;(element as any)[key] = props[key]
  }
}

const patch = (node: DomNode, parent: HTMLElement, element?: Node): Node => {
  if (typeof node.type === 'function') {
    const tracked = element as TrackedElement
    if (tracked && tracked.__component) {
      pushComponent(tracked.__component)
      return patch(node.type(node.props), parent, element)
    } else {
      const component = new Component()
      pushComponent(component)
      const el = patch(node.type(node.props), parent, element)
      ;(el as TrackedElement).__component = component
      component.element = el as Element
      component.node = node
      if (parent instanceof HTMLElement) {
        component.parent = parent
      }
      popComponent(component)
      return el
    }
  }
  if (!element) {
    if (typeof node.type !== 'string') {
      throw new Error('Expected html node')
    }
    if (node.type === 'TEXT') {
      const text = document.createTextNode(node.props.value)
      parent.appendChild(text)
      return text
    }
    if (node.type === 'EMPTY') {
      const text = document.createTextNode('')
      parent.appendChild(text)
      return text
    }
    const el = document.createElement(node.type)
    console.debug('createElement', el)
    updateAttributes(node, el)
    patchChildren(node, el)
    parent.appendChild(el)
    return el
  }
  if (node.type === 'EMPTY') {
    const el = document.createTextNode('')
    const component = (element as TrackedElement).__component
    if (component) {
      popComponent(component)
    }
    parent.replaceChild(el, element)
    return el
  }
  if (node.type === 'TEXT' && element instanceof Text) {
    if (node.props.value !== element.nodeValue) {
      element.nodeValue = node.props.value
    }
    return element
  }
  const el = element as Element

  if (node.type.toUpperCase() === el.tagName) {
    const tracked = element as TrackedElement
    if (tracked.__component) {
      pushComponent(tracked.__component)
    }
    updateAttributes(node, el)
    patchChildren(node, element)
    if (tracked.__component) {
      popComponent(tracked.__component)
    }
    return element
  }
  if (node.type.toUpperCase() !== el.tagName) {
    const newElement = document.createElement(node.type)
    updateAttributes(node, newElement)
    patchChildren(node, newElement)
    const component = (el as TrackedElement).__component
    if (component) {
      debugger
      removeComponent(component)
    }
    parent.replaceChild(newElement, element)
    return newElement
  }
  throw new Error('Unexpected node type')
}
