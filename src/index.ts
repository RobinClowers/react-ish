interface DomNode {
  tag: string;
  children: DomNode[] | string | null;
}

const renderComponent = (): DomNode => {
  return {
    tag: 'div',
    children: 'hello world',
  }
}

const renderChildren = (node: DomNode) => {
  if (node.children instanceof Array) {
    node.children.map(n => render(n))
  }
  return node.children
}

const render = (node: DomNode): string => {
  return `<${node.tag}>${renderChildren(node)}</${node.tag}>`
}

const rendered = render(renderComponent())
console.log(rendered)
const element = document.getElementById('app')
if (element) {
  element.innerHTML = rendered
}
