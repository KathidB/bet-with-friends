import React, { useEffect } from 'react'
import PanelNav from './common/nav/PanelNav'
import Chat from './main/chat/Chat'
import PanelRouting from './common/routing/PanelRouting'
import Ads from './main/ads/Ads'
import PanelFooter from './common/footer/PanelFooter'
import TopParent from './main/topParent/TopParent'
import UserProvider from './context/UserContext'
import { useAuth } from '../../auth/authcontext/AuthContext'
import { useNavigate } from 'react-router-dom'
import './panel.css'

function Panel () {
  const { login, ipMan, darkMode } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetch(`http://${ipMan}:5000/api/v1/auto-login`, {
          credentials: 'include'
        })
        const data = await response.json()

        if (response.ok && data.code === 'OK') {
          await login() // Wait for the login function to complete
        } else if (response.status === 401 || data.code === 'T1') {
          console.error(
            'Session expired or unauthorized. Redirecting to login.'
          )
          navigate('/login')
        } else {
          console.error('Błąd pobierania danych z API:', data)
          // Handle other error conditions if needed
        }
      } catch (error) {
        console.error('Błąd pobierania danych z API:', error)
        navigate('/login')
      }
    }

    fetchDataFromApi()
  }, [navigate, login, ipMan])

  return (
    <div
      className={`panel-wrapper panel  ${darkMode && 'darkmode-on'}'`}
      style={darkMode ? { backgroundColor: 'rgb(19, 18, 18)' } : null}
    >
      <UserProvider>
        <PanelNav />

        <div className={`panel-box ${darkMode && 'darkmode-on'}`}>
          <div className='left-panel'>
            <TopParent />
          </div>

          <div className={`center-panel ${darkMode && 'darkmode-on'}`}>
            <PanelRouting />
          </div>

          <div className='right-panel'>
            <Chat />
            <Ads />
          </div>
        </div>
        <PanelFooter />
      </UserProvider>
    </div>
  )
}

export default Panel
