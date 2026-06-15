const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const apiClient = async (path, options = {}) => {
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
  } catch {
    throw new Error('Cannot connect to backend. Make sure the server is running on port 5000.')
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const validationMessage = data.errors?.[0]?.msg
    throw new Error(validationMessage || data.message || 'Something went wrong')
  }

  return data
}
