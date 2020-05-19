import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Resource, ResourceExtension } from '../factory/Resource'

export function useResource<
  T,
  E extends ResourceExtension,
  R extends Resource<T, E>
>(initialResource: R | (() => R)): [R, Dispatch<SetStateAction<R>>] {
  const [resource, setResource] = useState(initialResource)

  const { cancel } = resource

  useEffect(() => cancel, [cancel])

  return [resource, setResource]
}
