import { SuspenderProps } from './Suspender-types'
import { useController } from './Suspender-controller'
import React from 'react'
import { ResourceExtension } from '../../factory/Resource'

export function Suspender<T, E extends ResourceExtension>(
  props: SuspenderProps<T, E>
) {
  const { children } = useController(props)

  return <>{children}</>
}
