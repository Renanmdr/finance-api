import {
  CreateUserController,
  DeleteUserController,
  GetUserBalanceController,
  GetUserByIdController,
  UpdateUserController,
} from '../../controllers/index.js'
import {
  PostgresCreateUserRepository,
  PostgresDeleteUserByIdRepository,
  PostgresGetUserBalanceRepository,
  PostgresGetUserByEmailRepository,
  PostgresGetUserByIdRepository,
  PostgresUpdateUserRepository,
} from '../../repositories/postgres/index.js'
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserBalanceUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from '../../use-cases/index.js'

export const makeGetUserByIdController = () => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository()
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)
  return getUserByIdController
}

export const makeCreateUserController = () => {
  const createUserRepository = new PostgresCreateUserRepository()
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository,
  )

  const createUserController = new CreateUserController(createUserUseCase)
  return createUserController
}

export const makeUpdateUserController = () => {
  const updateUserRepository = new PostgresUpdateUserRepository()
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
  const updateUserUseCase = new UpdateUserUseCase(
    updateUserRepository,
    getUserByEmailRepository,
  )
  const updateUserController = new UpdateUserController(updateUserUseCase)
  return updateUserController
}

export const makeDeleteUserController = () => {
  const deleteUserByIdRepository = new PostgresDeleteUserByIdRepository()
  const deleteUserUseCase = new DeleteUserUseCase(deleteUserByIdRepository)
  const deleteUserController = new DeleteUserController(deleteUserUseCase)
  return deleteUserController
}

export const makeGetUserBalanceController = () => {
  const getUserBalanceRepository = new PostgresGetUserBalanceRepository()
  const getUserByIdRepository = new PostgresGetUserByIdRepository()
  const getUserBalanceUseCase = new GetUserBalanceUseCase(
    getUserBalanceRepository,
    getUserByIdRepository,
  )
  const getUserBalanceController = new GetUserBalanceController(
    getUserBalanceUseCase,
  )
  return getUserBalanceController
}
