export interface DomNode {
  tag: string;
  props: {
    [key: string]: any;
    children?: DomNode[];
  }
}

export interface Attribute {
  [key: string]: string;
}

export const render = (node: DomNode, target: HTMLElement): void => {
  target.appendChild(renderImpl(node))
}

const renderImpl = (node: DomNode): Element => {
  const el = document.createElement(node.tag)
  if (node.props.children instanceof Array) {
    for (const n of node.props.children) {
      if (n.tag === 'TEXT') {
        el.appendChild(document.createTextNode(n.props.value))
      } else {
        el.appendChild(renderImpl(n))
      }
    }
  }
  return el
}
