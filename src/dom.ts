import { Component, ElementType } from './createElement'
import { State, resetStateIndex } from './hooks'

export interface DomNode {
  type: ElementType;
  props: Props & {
    children?: DomNode[];
  }
}

export interface Props {
  [key: string]: any;
}

let rootNode: DomNode
let rootElement: HTMLElement

export const update = (state: State) => {
  resetStateIndex()
  render(rootNode, rootElement, state)
}

export const render = (node: DomNode, target: HTMLElement, state: State = {}): void => {
  console.debug('--- render ---')
  rootNode = node
  rootElement = target

  while (target.hasChildNodes()) {
    target.lastChild && target.removeChild(target.lastChild);
  }
  target.appendChild(renderImpl(node))
}

const renderImpl = (node: DomNode): Element => {
  if (typeof node.type === 'function') {
    return renderImpl(node.type(node.props))
  }
  const el = document.createElement(node.type)
  const { children, prototype, ...props } = node.props
  for (const key of Object.keys(props)) {
    (el as any)[key] = props[key]
  }

  if (children instanceof Array) {
    for (const n of children) {
      if (n.type === 'TEXT') {
        el.appendChild(document.createTextNode(n.props.value))
      } else {
        el.appendChild(renderImpl(n))
      }
    }
  }
  return el
}
