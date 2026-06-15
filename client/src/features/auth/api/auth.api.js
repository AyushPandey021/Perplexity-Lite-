import { apiClient } from '../../../shared/lib/apiClient'

export const loginUser = (payload) =>
  apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const registerUser = (payload) =>
  apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
