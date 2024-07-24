import { CreateUserUseCase } from '../use-cases/create-user.js'
import { badRequest, created, serverError } from './helpers/http.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
  checkIfEmailIsValid,
  EmailAlredyInUseResponse,
  invalidPasswordResponse,
} from './helpers/user.js'

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const requiredFilds = ['first_name', 'last_name', 'email', 'password']

      for (const field of requiredFilds) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({ message: `Missing param ${field}` })
        }
      }
      const passwordIsValid = checkIfEmailIsValid(params.password)

      if (!passwordIsValid) {
        return invalidPasswordResponse()
      }

      const isEmailValid = checkIfEmailIsValid(params.email)

      if (!isEmailValid) {
        return EmailAlredyInUseResponse()
      }

      const createUserUseCase = new CreateUserUseCase()

      const createdUser = await createUserUseCase.execute(params)

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
