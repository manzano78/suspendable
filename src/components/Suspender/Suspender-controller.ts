import { SuspenderProps } from './Suspender-types'
import { isFunction } from './Suspender-utils'
import { ResourceExtension } from '../../factory/Resource'

export function useController<T, E extends ResourceExtension>(
  props: SuspenderProps<T, E>
) {
  const { resource, children: providedChildren } = props

  const resourceValue = resource.read()

  const children = isFunction(providedChildren)
    ? providedChildren(resourceValue)
    : providedChildren

  return { children }
}
