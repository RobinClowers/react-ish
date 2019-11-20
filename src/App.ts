import { DomNode } from './dom'
import { createElement } from './createElement'

const renderComponent = (): DomNode => {
  return createElement(
    'div',
    undefined,
    renderHeader({ text: 'The title' }),
    createElement('p', undefined, 'wow, so cool')
  )
}

const renderHeader = ({ text }: { text: string }): DomNode => {
  return createElement('h1', { title: text }, text)
}

export default renderComponent

