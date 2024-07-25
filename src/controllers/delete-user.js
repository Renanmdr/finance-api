import { DeleteUserUseCase } from '../use-cases/index.js'
import { checkIfIdIsValid, invalidIdResponse, ok, serverError } from './helpers'

export class DeleteUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId
      const isIdValid = checkIfIdIsValid(userId)

      if (!isIdValid) {
        return invalidIdResponse()
      }

      const deleteUserUseCase = new DeleteUserUseCase()
      const deleteUser = await deleteUserUseCase.execute(userId)
      return ok(deleteUser)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
