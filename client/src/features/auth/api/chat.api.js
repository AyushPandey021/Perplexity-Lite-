import { apiClient } from '../../../shared/lib/apiClient'

export const getChats = () => apiClient('/chats')

export const getMessages = (chatId) => apiClient(`/chats/${chatId}/messages`)

export const sendChatMessage = ({ message, chatId }) =>
  apiClient('/chats/message', {
    method: 'POST',
    body: JSON.stringify({ message, chatId }),
  })

export const deleteChat = (chatId) =>
  apiClient(`/chats/delete/${chatId}`, {
    method: 'DELETE',
  })
