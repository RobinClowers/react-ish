import { Props, DomNode } from './dom'

type NonNullChild = string | DomNode
export type Child = NonNullChild | null
export type Component = (props: any) => DomNode
export type ElementType = string | Component

const notEmpty = <T>(value: T | null | undefined): value is T => (
  value !== null && value !== undefined
)

export const createElement = (
  tag: ElementType,
  props?: Props,
  ...children: Child[]
): DomNode => {
  const compacted: NonNullChild[] = children.filter(notEmpty)
  return {
    tag,
    props: {
      ...props,
      children: compacted.map((c: NonNullChild) => (
        typeof c === 'string' ? { tag: 'TEXT', props: { value: c } } : c
      )),
    }
  }
}
