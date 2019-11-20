import { update } from './dom'

export interface State { [key: number]: any }

const state: State = {}

let stateIndex: number = 0

const setState = <T>(key: number, value: T) => {
  state[key] = value
  update(state)
}

export const resetStateIndex = () => {
  stateIndex = 0
}

export type UseState<T> = [T, (value: T) => void]

export const useState = <T>(initialValue: T): UseState<T> => {
  if (state[stateIndex] === undefined) {
    state[stateIndex] = initialValue
  }
  const key = stateIndex
  console.debug('UseState', state[stateIndex], key)
  const result: UseState<T> = [
    state[stateIndex],
    (newValue: T) => {
      setState(key, newValue)
    }
  ]
  stateIndex++
  return result
}
