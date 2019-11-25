import { Props, DomNode } from './dom'

type NonNullChild = string | DomNode
export type Child = NonNullChild | null
export type ComponentFunc = (props: any) => DomNode
export type ElementType = string | ComponentFunc

export const createElement = (
  type: ElementType,
  props?: Props,
  ...children: Child[]
): DomNode => {
  return {
    type,
    props: {
      ...props,
      children: children.map((c: Child) => {
        if (!c) {
          return { type: 'EMPTY', props: {} }
        }
        if (typeof c === 'string') {
          return { type: 'TEXT', props: { value: c } }
        } else {
          return c
        }
      }),
    },
  }
}
