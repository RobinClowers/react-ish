import { update } from './dom'
import Component, { State } from './Component'

const componentStack: Component[] = []
let currentComponent: Component | undefined
const allComponents = new Set<Component>()

const currentValue = () => {
  if (!currentComponent) {
    throw new Error('currentComponent is undefined')
  }
  return currentComponent.currentStateValue()
}

const setState = <T>(component: Component, key: number, value: T) => {
  component.state[key] = value
  allComponents.forEach(c => c.resetStateIndex())
  currentComponent = component
  update(component)
}

export const pushComponent = (newComponent: Component) => {
  allComponents.add(newComponent)
  currentComponent && componentStack.push(currentComponent)
  if (newComponent !== currentComponent) {
    currentComponent = newComponent
  }
}

export const removeComponent = (component: Component) => {
  allComponents.delete(component)
}

export const popComponent = (current: Component) => {
  if (current !== componentStack[componentStack.length]) {
    currentComponent = componentStack.pop()
  }
}

export type UseState<T> = [T, (value: T) => void]

export const useState = <T>(initialValue: T): UseState<T> => {
  if (!currentComponent) {
    throw new Error('currentComponent is undefined')
  }
  if (currentValue() === undefined) {
    currentComponent.setState(initialValue)
  }
  const key = currentComponent.currentStateKey
  const component = currentComponent
  console.debug('UseState', currentComponent.currentStateKey, currentValue())
  const result: UseState<T> = [
    currentValue() as T,
    (newValue: T) => {
      setState(component, key, newValue)
    },
  ]
  currentComponent.currentStateKey++
  return result
}
