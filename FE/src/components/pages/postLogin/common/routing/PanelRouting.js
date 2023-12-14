import { Routes, Route } from 'react-router-dom'
import Prediction from '../../menu/predictions/Prediction'
import PanelLeaderboard from '../../menu/leaderboard/PanelLeaderboard'
import Schedule from '../../menu/schedule/Schedule'
import MyProfile from '../../menu/myprofile/MyProfile'
import NotFound from '../../../../auth/NotFound'

function PanelRounting () {
  return (
    <>
      <div className='panel-routing-box'>
        <Routes>
          <Route path='/' element={<Prediction />} />
          <Route path='/toptypers' element={<PanelLeaderboard />} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/profile' element={<MyProfile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default PanelRounting
