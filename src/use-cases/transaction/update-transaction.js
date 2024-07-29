import { UserNotFoundError } from '../../errors/user'

export class UpdateTransactionUseCase {
  constructor(updateTransactionRepository, getUserByIdRepositoy) {
    this.updateTransactionRepository = updateTransactionRepository
    this.getUserByIdRepositoy = getUserByIdRepositoy
  }

  async execute(userId, params) {
    const user = await this.getUserByIdRepositoy.execute(params.userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const transaction = await this.updateTransactionRepository.execute(
      userId,
      params,
    )

    return transaction
  }
}
