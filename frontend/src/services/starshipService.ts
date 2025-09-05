import axios, { type AxiosResponse } from "axios"
import { handleAuthenticationError, isAuthenticationError } from "../util/authUtils"
import { API_BASE_URL } from "../util/consts"
import type { Starship } from "../types/starship.dto"
import type { LoginRequest } from "../types/loginRequest.dto"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})

// Add request interceptor to include auth token and handle missing tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      console.warn("No authentication token found - redirecting to login")
      handleAuthenticationError()
      return Promise.reject(new Error("Authentication required"))
    }
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors globally
    if (isAuthenticationError(error)) {
      console.warn("API authentication error:", error)
      handleAuthenticationError()
    }
    return Promise.reject(error)
  }
)

export const starshipsApi = {
  // Get all starships
  getStarships: async (): Promise<Starship[]> => {
    try {
      const response: AxiosResponse<Starship[]> = await api.get("/starships")
      return response.data
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error("Failed to fetch starships")
    }
  },

  login: async ({ username, password }: LoginRequest) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password })
      return response.data
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error("Invalid credentials")
    }
  }
}

export default starshipsApi
