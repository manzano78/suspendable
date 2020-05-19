import { ReactNode } from 'react'
import { Resource, ResourceExtension } from '../../factory/Resource'

export interface SuspenderProps<T, E extends ResourceExtension> {
  resource: Resource<T, E>
  children?: ReactNode | ((resourceValue: T) => ReactNode)
}
