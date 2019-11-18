import { DomNode } from './dom'
import { createElement } from './createElement'

const renderComponent = (): DomNode => {
  return createElement('div',
    [
      renderHeader({ text: 'The title' }),
      createElement('p', 'wow, so cool'),
    ]
  )
}

const renderHeader = ({ text }: { text: string }): DomNode => {
  return createElement('h1', text)
}

export default renderComponent

