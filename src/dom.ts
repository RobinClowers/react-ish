import { Component } from './createElement'
import { State, resetStateIndex } from './hooks'

export interface DomNode {
  tag: string;
  props: {
    [key: string]: any;
    children?: DomNode[];
  }
}

export interface Props {
  [key: string]: any;
}

let rootComponent: Component
let rootElement: HTMLElement

export const update = (state: State) => {
  resetStateIndex()
  render(rootComponent, rootElement, state)
}

export const render = (component: Component, target: HTMLElement, state: State = {}): void => {
  console.debug('--- render ---')
  rootComponent = component
  rootElement = target

  while (target.hasChildNodes()) {
    target.lastChild && target.removeChild(target.lastChild);
  }
  target.appendChild(renderImpl(component()))
}

const renderImpl = (node: DomNode): Element => {
  const el = document.createElement(node.tag)
  const { children, prototype, ...props } = node.props
  for (const key of Object.keys(props)) {
    (el as any)[key] = props[key]
  }

  if (children instanceof Array) {
    for (const n of children) {
      if (n.tag === 'TEXT') {
        el.appendChild(document.createTextNode(n.props.value))
      } else {
        el.appendChild(renderImpl(n))
      }
    }
  }
  return el
}
