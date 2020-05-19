export class ResourceDataError extends Error {
  readonly originalError: any
  readonly refreshData: () => void

  constructor(originalError: any, refreshData: () => void) {
    super('An error occurred while querying resource.')
    this.originalError = originalError
    this.refreshData = refreshData
  }
}
