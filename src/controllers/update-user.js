import { EmailAlreadyInUseError } from '../errors/user.js'
import {
  checkIfEmailIsValid,
  checkIfIdIsValid,
  checkIfPasswordIsValid,
  EmailAlredyInUseResponse,
  invalidIdResponse,
  invalidPasswordResponse,
  badRequest,
  ok,
  serverError,
} from './helpers/index.js'

export class UpdateUserController {
  constructor(updateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId

      const isIdValid = checkIfIdIsValid(userId)

      if (!isIdValid) {
        return invalidIdResponse()
      }

      const Params = httpRequest.body

      const allowedFields = ['first_name', 'last_name', 'email', 'password']

      const someFieldIsNotAllowed = Object.keys(Params).some(
        (field) => !allowedFields.includes(field),
      )

      if (someFieldIsNotAllowed) {
        return badRequest({
          message: 'Some provided field is not allowed.',
        })
      }

      if (Params.password) {
        const passwordIsValid = checkIfPasswordIsValid(Params.password)

        if (!passwordIsValid) {
          return invalidPasswordResponse()
        }
      }

      if (Params.email) {
        const emailIsValid = checkIfEmailIsValid(Params.email)

        if (!emailIsValid) {
          return EmailAlredyInUseResponse()
        }
      }

      const updatedUser = await this.updateUserUseCase.execute(userId, Params)

      return ok(updatedUser)
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message })
      }

      console.error(error)
      return serverError()
    }
  }
}
