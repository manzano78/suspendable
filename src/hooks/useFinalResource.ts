import { Resource, ResourceExtension } from '../factory/Resource'
import { useEffect } from 'react'
import { useFinalAttribute } from '@manzano/component-utils'

export function useFinalResource<
  T,
  E extends ResourceExtension,
  R extends Resource<T, E>
>(resource: R | (() => R)): R {
  const finalResource = useFinalAttribute(resource)

  useEffect(() => finalResource.cancel, [])

  return finalResource
}
