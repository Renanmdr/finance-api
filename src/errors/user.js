export class EmailAlreadyInUseError extends Error {
  constructor(email) {
    super(`The provided e-mail ${email} is already in use`)
    this.name = 'EmailAlrealInUseError'
  }
}

export class UserNotFoundError extends Error {
  constructor(userId) {
    super(`User with id ${userId} not found`)
    this.name = 'UserNotFoundError'
  }
}
