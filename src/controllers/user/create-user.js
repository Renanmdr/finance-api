import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
  checkIfEmailIsValid,
  EmailAlredyInUseResponse,
  invalidPasswordResponse,
  badRequest,
  created,
  serverError,
  checkIfPasswordIsValid,
} from '../helpers/index.js'

export class CreateUserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const requiredFilds = ['first_name', 'last_name', 'email', 'password']

      for (const field of requiredFilds) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({ message: `Missing param ${field}` })
        }
      }
      const passwordIsValid = checkIfPasswordIsValid(params.password)

      if (!passwordIsValid) {
        return invalidPasswordResponse()
      }

      const isEmailValid = checkIfEmailIsValid(params.email)

      if (!isEmailValid) {
        return EmailAlredyInUseResponse()
      }

      const createdUser = await this.createUserUseCase.execute(params)

      return created(createdUser)
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message })
      }
      console.log(error)

      return serverError()
    }
  }
}
