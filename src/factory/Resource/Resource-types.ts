import { PENDING, REJECTED, RESOLVED } from './Resource-constants'

export interface PendingData {
  status: typeof PENDING
  promise: Promise<void>
  cancel?: () => void
}

export interface RejectedData {
  status: typeof REJECTED
  error: any
}

export interface ResolvedData<T> {
  status: typeof RESOLVED
  value: T
}

export type Data<T> = PendingData | RejectedData | ResolvedData<T>

export interface CancellablePromise<T> {
  promise: Promise<T>
  cancel: Cancel
}

export type Cancel = () => void
export type Read<T> = () => T

export type Resource<T, E extends ResourceExtension = {}> = E & {
  read: Read<T>
  cancel: Cancel
}

export interface ResourceExtension {
  [p: string]: any
}
