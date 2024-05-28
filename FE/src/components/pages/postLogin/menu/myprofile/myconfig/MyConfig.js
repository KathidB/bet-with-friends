import { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useUser } from '../../../context/UserContext'
import PanelPassReset from '../../../../../auth/panelpassreset/PanelPassReset'
import { ImArrowDown } from 'react-icons/im'
import { useTranslation } from 'react-i18next'

import './myconfig.css'

function MyConfig () {
  const { t } = useTranslation()
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
          'http://4.184.219.209:5000/api/v1/avatar',
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
      console.error('Select new avatar')
      return
    }

    try {
      const profileEndpoint = 'http://4.184.219.209:5000/api/v1/profile'
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

        // Tutaj możesz dodać logikę, która aktualizuje UI w odpowiedzi na udaną zmianę avatara
        updateUserProfile()
      } else {
        console.error('Error')
      }
    } catch (error) {
      console.error('Error:', error)
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
            {t('avatar.avatar')} <ImArrowDown />
          </button>

          {newAvatar && (
            <>
              <div className='avatar-list'>
                {changeAvatar.map(avatar => (
                  <img
                    width={75}
                    key={avatar.avatar}
                    src={`http://4.184.219.209:5000/api/v1/avatar/${avatar.avatar}`}
                    alt={`Avatar ${avatar.id}`}
                    className={`avatar-item ${
                      selectedAvatar === avatar.id ? 'selected' : ''
                    }`}
                    onClick={() => changeAvatarBtn(avatar.avatar)}
                  />
                ))}
              </div>

              <p> {t('avatar.choice')}:</p>
              {selectedAvatar && (
                <>
                  <img
                    src={`http://4.184.219.209:5000/api/v1/avatar/${selectedAvatar}`}
                    alt='Selected Avatar'
                    className='selected-avatar'
                    width={130}
                  />
                  <button className='config-btn' onClick={handleAvatarChange}>
                    {loading ? (
                      <>
                        <FaSpinner className='spinner-icon' />
                        Sending...
                      </>
                    ) : (
                      '  Change avatar'
                    )}
                  </button>
                  {status ? <p>{t('avatar.changed')}</p> : null}
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
