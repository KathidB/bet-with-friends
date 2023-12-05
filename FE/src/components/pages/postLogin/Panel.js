import { useEffect } from 'react'
import PanelNav from './common/nav/PanelNav'
import GroupList from './main/grouplist/GroupList'
import PanelRounting from './common/routing/PanelRouting'
import Ads from './main/ads/Ads'
import PanelFooter from './common/footer/PanelFooter'
import TopParent from './main/topParent/TopParent'
import UserProvider from './context/UserContext'
import { useAuth } from '../../auth/authcontext/AuthContext'
import { useNavigate } from 'react-router-dom'
import './panel.css'

function Panel () {
  const { loggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Sprawdź, czy użytkownik jest zalogowany
    if (!loggedIn) {
      // Jeśli nie jest zalogowany, przekieruj go na stronę logowania
      navigate('/login')
    }
  }, [loggedIn, navigate])

  return (
    <div className='panel-wrapper panel'>
      <UserProvider>
        <PanelNav />
        <div className='panel-box'>
          <div className='left-panel'>
            <GroupList />
            <Ads />
          </div>

          <div className='center-panel'>
            <PanelRounting />
          </div>

          <div className='right-panel'>
            <TopParent />
          </div>
        </div>
        <PanelFooter />
      </UserProvider>
    </div>
  )
}

export default Panel
