import { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useUser } from '../../../context/UserContext'
import PanelPassReset from '../../../../../auth/panelpassreset/PanelPassReset'
import { ImArrowDown } from 'react-icons/im'

import './myconfig.css'

function MyConfig () {
  const [changeAvatar, setChangeAvatar] = useState([])
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const { updateUserProfile } = useUser()
  const [newAvatar, setNewAvatar] = useState(false)
  // const [newNick, setNewNick] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          'http://130.162.44.103:5000/api/v1/avatar',
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        setLoading(false)

        const jsonData = await response.json()
        setChangeAvatar(jsonData)
      } catch (error) {
        console.error('Błąd pobierania danych:', error)
      }
    }

    fetchData()
  }, [])

  const changeAvatarBtn = avatar => {
    setSelectedAvatar(avatar)
  }

  const handleAvatarChange = async () => {
    if (!selectedAvatar) {
      console.error('Nie wybrano avatara')
      return
    }

    try {
      const profileEndpoint = 'http://130.162.44.103:5000/api/v1/profile'
      const requestBody = {
        avatar: selectedAvatar
      }

      const avatarResponse = await fetch(profileEndpoint, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (avatarResponse.ok) {
        setStatus(true)
        console.log('Zmiana avatara udana')
        // Tutaj możesz dodać logikę, która aktualizuje UI w odpowiedzi na udaną zmianę avatara
        updateUserProfile()
      } else {
        console.error('Błąd podczas zmiany avatara')
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania żądania:', error)
    }
  }

  return (
    <>
      <div className='tab-config'>
        <PanelPassReset />

        <div className='config-avatar-box'>
          <button
            className='config-btn avatar-btn'
            onClick={() => setNewAvatar(!newAvatar)}
          >
            Wybierz nowy avatar <ImArrowDown />
          </button>

          {newAvatar && (
            <>
              <div className='avatar-list'>
                {changeAvatar.map(avatar => (
                  <img
                    width={75}
                    key={avatar.avatar}
                    src={`http://130.162.44.103:5000/api/v1/avatar/${avatar.avatar}`}
                    alt={`Avatar ${avatar.id}`}
                    className={`avatar-item ${
                      selectedAvatar === avatar.id ? 'selected' : ''
                    }`}
                    onClick={() => changeAvatarBtn(avatar.avatar)}
                  />
                ))}
              </div>

              <p>Twój wybór:</p>
              {selectedAvatar && (
                <>
                  <img
                    src={`http://130.162.44.103:5000/api/v1/avatar/${selectedAvatar}`}
                    alt='Selected Avatar'
                    className='selected-avatar'
                    width={130}
                  />
                  <button className='config-btn' onClick={handleAvatarChange}>
                    {loading ? (
                      <>
                        <FaSpinner className='spinner-icon' />
                        Przesyłanie...
                      </>
                    ) : (
                      '  Zmień avatar'
                    )}
                  </button>
                  {status ? <p>Avatar zmieniony</p> : null}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default MyConfig
