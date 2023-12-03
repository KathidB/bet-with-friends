import { useEffect, useState } from 'react'
import './myconfig.css'

function MyConfig () {
  const [changeAvatar, setChangeAvatar] = useState([])
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://130.162.44.103:5000/api/v1/avatar',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        const jsonData = await response.json()
        setChangeAvatar(jsonData)
      } catch (error) {
        console.error('Błąd pobierania danych:', error)
      }
    }

    fetchData()
  }, [])

  function changeAvatarBtn () {
    console.log(selectedAvatar)
  }

  const handleAvatarChange = avatarId => {
    setSelectedAvatar(avatarId)
  }

  const handlePasswordChange = () => {
    // Dodaj logikę zmiany hasła tutaj, np. wysyłanie na serwer

    console.log('Nowe hasło:', newPassword)
    console.log('Powtórz hasło:', repeatPassword)

    // Resetuj pola po zmianie hasła
    setNewPassword('')
    setRepeatPassword('')
  }

  return (
    <>
      <div className='tab-config'>
        <form className='config-form'>
          <label className='config-form-item'>Zmień hasło:</label>
          <input
            className='config-form-item'
            type='password'
            placeholder='Nowe hasło...'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <input
            className='config-form-item'
            type='password'
            placeholder='Powtórz hasło...'
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
          />
          <button className='config-btn' onClick={handlePasswordChange}>
            Zmień hasło
          </button>
        </form>

        <div>
          <p>Zmień avatar</p>
          <div className='avatar-list'>
            {changeAvatar.map(avatar => (
              <img
                key={avatar.avatar}
                src={`http://130.162.44.103:5000/api/v1/avatar/${avatar.avatar}`}
                alt={`Avatar ${avatar.id}`}
                className={`avatar-item ${
                  selectedAvatar === avatar.id ? 'selected' : ''
                }`}
                onClick={() => handleAvatarChange(avatar.avatar)}
              />
            ))}
          </div>
          <p>Twój wybór:</p>
          {selectedAvatar && (
            <img
              src={`http://130.162.44.103:5000/api/v1/avatar/${selectedAvatar}`}
              alt='Selected Avatar'
              className='selected-avatar'
            />
          )}
          <button className='config-btn' onClick={changeAvatarBtn}>
            Zmień avatar
          </button>
        </div>
      </div>
    </>
  )
}

export default MyConfig
