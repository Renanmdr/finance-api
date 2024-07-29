import { UserNotFoundError } from '../../errors/user.js'
export class GetTransactionsByUserIdUseCase {
  constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
    this.GetUserByIdRepository = getUserByIdRepository
    this.getTransactionsByUserIdRepository = getTransactionsByUserIdRepository
  }

  async execute(params) {
    const user = await this.GetUserByIdRepository.execute(params.userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const transactions = await this.getTransactionsByUserIdRepository.execute(
      params.userId,
    )

    return transactions
  }
}
