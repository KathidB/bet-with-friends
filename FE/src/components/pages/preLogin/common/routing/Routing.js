import { Routes, Route } from 'react-router-dom'

import Main from '../../main/Main'
import Matches from '../../menu/matches/Matches'
import About from '../../menu/about/About'
import Leaderboard from '../../menu/leaderboard/Leaderboard'
import Login from '../../../../auth/login/Login'
import SingUp from '../../../../auth/signup/SignUp'

function Routing () {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/Matches' element={<Matches />} />
      <Route path='/About' element={<About />} />
      <Route path='/Leaderboard' element={<Leaderboard />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/SingUp' element={<SingUp />} />
    </Routes>
  )
}

export default Routing
