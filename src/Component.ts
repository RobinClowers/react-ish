import { update, DomNode } from './dom'

export interface State {
  [key: number]: any
}

export default class Component {
  state: State = {}
  currentStateKey: number = 0
  element?: Element
  parent?: HTMLElement
  node?: DomNode

  resetStateIndex() {
    this.currentStateKey = 0
  }

  setState(value: any) {
    this.state[this.currentStateKey] = value
  }

  currentStateValue() {
    return this.state[this.currentStateKey]
  }
}
