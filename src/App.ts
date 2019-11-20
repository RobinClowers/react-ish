import { DomNode } from './dom'
import { createElement } from './createElement'
import { useState } from './hooks'

const renderComponent = (): DomNode => {
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState('The title')
  const [newTitle, setNewTitle] = useState(title)
  const handleIncrement = () => {
    setCount(count + 1)
  }
  const handleChangeTitle = (e: Event) => {
    const target = e.target as HTMLInputElement
    target.value && setNewTitle(target.value)
  }
  const handleSetTitle = () => {
    setTitle(newTitle)
  }
  return createElement(
    'div',
    undefined,
    renderHeader({ text: title }),
    createElement('p', undefined, count.toString(),
      createElement('br', undefined),
      createElement('button', { onclick: handleIncrement }, 'increment'),
    ),
    createElement('p', undefined,
      createElement('input', { type: 'text', value: newTitle, onchange: handleChangeTitle }),
      createElement('br', undefined),
      createElement('button', { onclick: handleSetTitle }, 'set title'),
    )
  )
}

const renderHeader = ({ text }: { text: string }): DomNode => {
  return createElement('h1', { title: text }, text)
}

export default renderComponent

