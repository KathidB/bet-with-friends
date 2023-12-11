import { useEffect, useState } from 'react'
import { useAuth } from '../../../../auth/authcontext/AuthContext'

function UserInfo () {
  const [userProfile, setUserProfile] = useState([])
  const { ipMan } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://${ipMan}:5000/api/v1/profile`
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })

        // Log the cookies received

        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          )
        }

        const data = await response.json()
        setUserProfile(data)
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error)
      }
    }

    fetchData()
  }, [ipMan])

  return userProfile
}

export default UserInfo
