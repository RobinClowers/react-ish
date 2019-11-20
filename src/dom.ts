export interface DomNode {
  tag: string;
  props: {
    [key: string]: any;
    children?: DomNode[];
  }
}

export interface Props {
  [key: string]: string;
}

export const render = (node: DomNode, target: HTMLElement): void => {
  target.appendChild(renderImpl(node))
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
