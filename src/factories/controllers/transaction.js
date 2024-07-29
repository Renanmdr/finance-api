import {
  CreateTransactionController,
  GetTransactionsByUserIdController,
  UpdateTransactionController,
} from '../../controllers/index.js'
import {
  PostgresCreateTransactionRepository,
  PostgresGetUserByIdRepository,
  PostgresGetTransactionsByUserIdRepository,
  PostgresUpdateTransactionRepository,
} from '../../repositories/postgres/index.js'
import {
  CreateTransactionUseCase,
  GetTransactionsByUserIdUseCase,
  UpdateTransactionUseCase,
} from '../../use-cases/index.js'

export const makeCreateTransactionController = () => {
  const createTransactionRepository = new PostgresCreateTransactionRepository()
  const getUserByIdRepository = new PostgresGetUserByIdRepository()
  const createTransactionUseCase = new CreateTransactionUseCase(
    createTransactionRepository,
    getUserByIdRepository,
  )
  const createTransactionController = new CreateTransactionController(
    createTransactionUseCase,
  )

  return createTransactionController
}

export const makeGetTransactionsByUserIdController = () => {
  const getTransactionsByUserIdRepository =
    new PostgresGetTransactionsByUserIdRepository()
  const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()

  const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
    getTransactionsByUserIdRepository,
    postgresGetUserByIdRepository,
  )
  const getTransactionsByUserIdController =
    new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase)

  return getTransactionsByUserIdController
}
export const makeUpdateTransactionController = () => {
  const updateTransactionRepository = new PostgresUpdateTransactionRepository()

  const updateTransactionUseCase = new UpdateTransactionUseCase(
    updateTransactionRepository,
  )
  const udateTransactionController = new UpdateTransactionController(
    updateTransactionUseCase,
  )

  return udateTransactionController
}
