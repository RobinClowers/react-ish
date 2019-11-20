import { DomNode } from './dom'
import { createElement } from './createElement'
import { useState } from './hooks'

const renderComponent = (): DomNode => {
  const [showCounter, setShowCounter] = useState(true)
  const handleHideCounter = () => {
    setShowCounter(!showCounter)
  }
  return createElement(
    'div',
    undefined,
    (showCounter ? Counter() : null),
    createElement('p', undefined,
      createElement(
        'button',
        { onclick: handleHideCounter },
        `${showCounter ? 'Hide' : 'Show'} counter`
      ),
    ),
    renderHeader({ text: 'The title' }),
  )
}

const Counter = (): DomNode => {
  const [count, setCount] = useState(0)
  const handleIncrement = () => {
    setCount(count + 1)
  }
  return createElement(
    'div',
    undefined,
    createElement('p', undefined, count.toString()),
    createElement('br', undefined),
    createElement('button', { onclick: handleIncrement }, 'increment')
  )
}

const renderHeader = ({ text }: { text: string }): DomNode => {
  const [color, setColor] = useState('black')
  const handleClick = (e: Event) => {
    if (color === 'black') {
      setColor('red')
    } else {
      setColor('black')
    }
  }
  return createElement('div', undefined,
    createElement('h1', { style: `color: ${color}`, title: text }, text),
    createElement('button', { onclick: handleClick }, 'change color')
  )
}

export default renderComponent

