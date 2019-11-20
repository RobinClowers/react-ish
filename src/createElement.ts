import { Props, DomNode } from './dom'

export type Child = string | DomNode

export const createElement = (
  tag: string,
  props?: Props,
  ...children: Child[]
): DomNode => {
  return {
    tag,
    props: {
      ...props,
      children: children.map((c: string | DomNode) => (
        typeof c === 'string' ? { tag: 'TEXT', props: { value: c } } : c
      )),
    }
  }
}
