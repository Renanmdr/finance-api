import { prisma } from '../../../../prisma/prisma.js'

export class PostgresDeleteTransactionRepository {
  async execute(transactionId) {
    try {
      const deleteTransaction = await prisma.transaction.delete({
        where: {
          id: transactionId,
        },
      })

      return deleteTransaction
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
