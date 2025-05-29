import { jwtDecode } from "jwt-decode"

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthResponse {
  token: string
  user: User
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  },

  getToken(): string | null {
    return localStorage.getItem('token')
  },

  isAuthenticated(): boolean {
    const token = this.getToken()
    if (!token) return false

    try {
      const decoded = jwtDecode(token)
      return decoded.exp ? decoded.exp * 1000 > Date.now() : false
    } catch {
      return false
    }
  },

  getUser(): User | null {
    const token = this.getToken()
    if (!token) return null

    try {
      const decoded = jwtDecode(token)
      return decoded as User
    } catch {
      return null
    }
  }
} 