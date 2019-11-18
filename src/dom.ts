export interface DomNode {
  tag: string;
  children: DomNode[] | string | null;
}

export const render = (node: DomNode): Element => {
  const el = document.createElement(node.tag)
  if (node.children instanceof Array) {
    node.children.map(n => render(n))
    for (const n of node.children) {
      el.appendChild(render(n))
    }
  }
  if (typeof node.children === 'string') {
    el.appendChild(document.createTextNode(node.children))
  }
  return el
}
