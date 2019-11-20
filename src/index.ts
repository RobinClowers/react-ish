import { render, DomNode } from './dom'
import App from './App'

const element = document.getElementById('app')
element && render(App, element)
