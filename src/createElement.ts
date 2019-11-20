import { Props, DomNode } from './dom'

type NonNullChild = string | DomNode
export type Child = NonNullChild | null
export type Component = (props: any) => DomNode
export type ElementType = string | Component

const notEmpty = <T>(value: T | null | undefined): value is T => (
  value !== null && value !== undefined
)

export const createElement = (
  type: ElementType,
  props?: Props,
  ...children: Child[]
): DomNode => {
  const compacted: NonNullChild[] = children.filter(notEmpty)
  return {
    type,
    props: {
      ...props,
      children: compacted.map((c: NonNullChild) => (
        typeof c === 'string' ? { type: 'TEXT', props: { value: c } } : c
      )),
    }
  }
}
