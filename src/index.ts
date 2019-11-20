import { render, DomNode } from './dom'
import { createElement } from './createElement'
import App from './App'

const element = document.getElementById('app')
element && render(createElement(App), element)
