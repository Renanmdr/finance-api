import {
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  serverError,
  transactionNotFoundResponse,
} from '../helpers/index.js'

export class DeleteTransactionController {
  constructor(deleteTransactionUseCase) {
    this.deleteTransactionUseCase = deleteTransactionUseCase
  }

  async execute(httpRequest) {
    try {
      const isIdValid = checkIfIdIsValid(httpRequest.params.transactionId)

      if (!isIdValid) {
        return invalidIdResponse()
      }

      const deleteTransaction = await this.deleteTransactionUseCase.execute(
        httpRequest.params.transactionId,
      )

      if (!deleteTransaction) {
        return transactionNotFoundResponse()
      }

      return ok(deleteTransaction)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
