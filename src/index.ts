import { render, DomNode } from './dom'
import App from './App'

const renderHeader = ({ text }: { text: string }): DomNode => {
  return {
    tag: 'h1',
    children: text,
  }
}

const rendered = render(App())
const element = document.getElementById('app')
if (element) {
  element.appendChild(rendered)
}
