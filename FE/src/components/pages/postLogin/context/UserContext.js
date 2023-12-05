import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

function UserProvider ({ children }) {
  const [userProfile, setUserProfile] = useState([])

  const updateUserProfile = async () => {
    try {
      const url = 'http://130.162.44.103:5000/api/v1/profile'
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
  }

  useEffect(() => {
    updateUserProfile()
  }, []) // Wywołaj funkcję przy pierwszym renderowaniu

  // Update the context when userProfile changes
  useEffect(() => {
    const updateUserContext = () => {
      //Dzięki tej funkcji jakakolwiek zmiana wywołana z nią robi update na zawartość profili, np. dla automatycznej zmiany avataru we wszystkich komponentach!
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
