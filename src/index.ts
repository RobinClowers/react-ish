import { render, DomNode } from './dom'
import App from './App'

const rendered = render(App())
const element = document.getElementById('app')
if (element) {
  element.appendChild(rendered)
}
