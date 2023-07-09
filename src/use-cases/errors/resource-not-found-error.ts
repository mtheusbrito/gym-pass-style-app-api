export class ResourceNotFoundError extends Error {
  constructor(message?: string) {
    message && console.log(message)
    super(`Resource ${message && message} not found! `)
  }
}
