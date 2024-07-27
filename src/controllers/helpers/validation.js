import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidIdResponse = () =>
  badRequest({ message: 'The Provided id is not valid.' })

export const requiredFieldIsMissingResponse = (field) => {
  return badRequest({
    message: `The field ${field} is required.`,
  })
}

export const checkIfString = (value) => typeof value === 'string'

export const validatedRequiredFilds = (params, requiredFilds) => {
  for (const field of requiredFilds) {
    const fildIsMissing = !params[field]
    const fieldIsEmpty =
      checkIfString(params[field]) &&
      validator.isEmpty(params[field], {
        ignore_whitespace: true,
      })
    if (fildIsMissing || fieldIsEmpty) {
      return {
        missingField: field,
        ok: false,
      }
    }
  }

  return {
    ok: true,
    missingField: undefined,
  }
}
