import { UserNotFoundError } from '../../errors/user.js'
import {
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from '../helpers/index.js'

export class GetUserBalanceController {
  constructor(getUserBalanceUserCase) {
    this.getUserBalanceUserCase = getUserBalanceUserCase
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId

      const isValidId = checkIfIdIsValid(userId)

      if (!isValidId) {
        return invalidIdResponse()
      }

      const balance = await this.getUserBalanceUserCase.execute({ userId })

      return ok(balance)
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse()
      }
      console.error(error)
      return serverError()
    }
  }
}
