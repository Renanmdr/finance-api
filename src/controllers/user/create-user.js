import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
  checkIfEmailIsValid,
  EmailAlredyInUseResponse,
  invalidPasswordResponse,
  badRequest,
  created,
  serverError,
  checkIfPasswordIsValid,
  validatedRequiredFilds,
  requiredFieldIsMissingResponse,
} from '../helpers/index.js'

export class CreateUserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const requiredFilds = ['first_name', 'last_name', 'email', 'password']

      const { ok: requiredFieldsWereProvided, missingField } =
        validatedRequiredFilds(params, requiredFilds)

      if (!requiredFieldsWereProvided) {
        return requiredFieldIsMissingResponse(missingField)
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
