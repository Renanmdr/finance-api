import validator from 'validator'
import { CreateUserUseCase } from '../use-cases/create-user.js'
import { badRequest, created, serverError } from './helpers.js'
import { EmailAlrealInUseError } from '../errors/user.js'

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

      if (params.password.length < 6) {
        return badRequest({ message: 'Password must be at least 6 characters' })
      }

      const isEmailValid = validator.isEmail(params.email)

      if (!isEmailValid) {
        return badRequest({
          message: 'Invalid e-mail. Please provide a valid one',
        })
      }

      const createUserUseCase = new CreateUserUseCase()

      const createdUser = await createUserUseCase.execute(params)

      return created(createdUser)
    } catch (error) {
      if (error instanceof EmailAlrealInUseError) {
        return badRequest({ message: error.message })
      }
      console.log(error)

      return serverError()
    }
  }
}
