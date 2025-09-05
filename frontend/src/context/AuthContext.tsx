import React, { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from 'react'
import starshipsApi from '../services/starshipService'

interface AuthContextType {
  user: string | null
  token: string | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps { children: ReactNode }

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for stored auth data on app load
    const storedToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('authUser')
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(storedUser)
      } catch (error) {
        // Clear invalid stored data
        localStorage.removeItem('authToken')
        localStorage.removeItem('authUser')
      }
    }
    
    setLoading(false) // Auth check complete
  }, [])

  // Attempts login and stores token in localStorage
  const login = useCallback(async (username: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await starshipsApi.login({ username, password })

      setUser(result.username)
      setToken(result.token)
      localStorage.setItem('authToken', result.token)
      localStorage.setItem('authUser', result.username)
    } catch (err: any) {
      setError(err.message || 'Failed to login')
      setUser(null)
      setToken(null)
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
    }

    setLoading(false)
  }, [])

  // Clears user and token state
  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('authToken')
  }, [])

  const value: AuthContextType = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user && !!token,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}