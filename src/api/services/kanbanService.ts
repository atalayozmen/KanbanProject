import apiClient from '../apiClient'

export const getPublicRequest = async () => {
    const response = await apiClient.get('/public')
    return response.data
}

export const getPrivateRequest = async () => {
    const response = await apiClient.get('/private')
    return response.data
}
