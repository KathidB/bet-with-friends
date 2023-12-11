import { useNavigate } from 'react-router-dom'
import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const ipMan = '130.162.44.103'
// const ipMan = 'localhost'

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn')
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false
  })

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn')
    if (storedLoggedIn) {
      setLoggedIn(JSON.parse(storedLoggedIn))
    }
  }, [])

  const login = () => {
    setLoggedIn(true)
    localStorage.setItem('loggedIn', JSON.stringify(true))
  }

  const logout = async () => {
    const url = `http://${ipMan}:5000/api/v1/logout`

    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        setLoggedIn(false)
        localStorage.removeItem('loggedIn')
        navigate('/login')
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, ipMan }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
