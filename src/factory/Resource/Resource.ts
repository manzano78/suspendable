import {
  Cancel,
  CancellablePromise,
  Data,
  Resource,
  ResourceExtension
} from './Resource-types'
import { PENDING, REJECTED, RESOLVED } from './Resource-constants'
import { ResourceDataError } from '../ResourceDataError'

export function createResource<T>(
  asyncFn: () => Promise<T> | CancellablePromise<T>
): Resource<T, {}>

export function createResource<T, E extends ResourceExtension>(
  asyncFn: () => Promise<T> | CancellablePromise<T>,
  extension: E
): Resource<T, E>

export function createResource<T, E extends ResourceExtension>(
  asyncFn: () => Promise<T> | CancellablePromise<T>,
  extension: E = {} as any
): Resource<T, E> {
  let data: Data<T>

  const initData = () => {
    let resultPromise: Promise<T>
    let cancel: Cancel | undefined

    const result = asyncFn()

    if (result instanceof Promise) {
      resultPromise = result
    } else {
      resultPromise = result.promise
      cancel = result.cancel
    }

    const promise = resultPromise.then(
      (value) => {
        data = { status: RESOLVED, value }
      },
      (originalError) => {
        const error = new ResourceDataError(originalError, initData)

        data = { status: REJECTED, error }
      }
    )

    data = { status: PENDING, promise, cancel }
  }

  const read = () => {
    switch (data.status) {
      case PENDING:
        throw data.promise
      case REJECTED:
        throw data.error
      case RESOLVED:
        return data.value
    }
  }

  const cancel = () => {
    if (data?.status === PENDING && data.cancel) {
      data.cancel()
    }
  }

  initData()

  return { read, cancel, ...extension }
}
