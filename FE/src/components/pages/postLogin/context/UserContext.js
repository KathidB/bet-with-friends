import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react'
import { useAuth } from '../../../auth/authcontext/AuthContext'

const UserContext = createContext()

function UserProvider ({ children }) {
  const [userProfile, setUserProfile] = useState([])
  const { ipMan } = useAuth()

  const updateUserProfile = useCallback(async () => {
    try {
      const url = `http://${ipMan}:5000/api/v1/profile`
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Network response was not ok.')
      }

      const data = await response.json()
      setUserProfile(data)
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error)
    }
  }, [ipMan])

  useEffect(() => {
    const fetchUserProfile = async () => {
      await updateUserProfile()
    }

    fetchUserProfile()
  }, [updateUserProfile]) // Wywołaj funkcję przy pierwszym renderowaniu

  // Update the context when userProfile changes
  useEffect(() => {
    const updateUserContext = () => {
      // Dzięki tej funkcji jakakolwiek zmiana wywołana z nią robi update na zawartość profili, np. dla automatycznej zmiany avataru we wszystkich komponentach!
    }

    updateUserContext()
  }, [userProfile])

  return (
    <UserContext.Provider value={{ userProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}

export default UserProvider
