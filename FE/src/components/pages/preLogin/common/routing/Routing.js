import { Routes, Route } from 'react-router-dom'

import Main from '../../main/Main'
import Matches from '../../menu/matches/Matches'
import About from '../../menu/about/About'
import Leaderboard from '../../menu/leaderboard/Leaderboard'
import Login from '../../../../auth/login/Login'
import SingUp from '../../../../auth/signup/SignUp'
import NewPassword from '../../../../auth/passreset/NewPassword'
import ResetPass from '../../../../auth/resetpass/ResetPass'

import NotFound from '../../../../auth/NotFound'

function Routing () {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/Matches' element={<Matches />} />
      <Route path='/About' element={<About />} />
      <Route path='/Leaderboard' element={<Leaderboard />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/SignUp' element={<SingUp />} />
      <Route path='/NewPassword' element={<NewPassword />} />

      {/* Dodaj nową trasę dla ResetPass z dynamicznym segmentem :token. Dzięki temu adress po reset token może być randomowy i odbierać tokeny do resetowania hasła bez uruchamiania NotFound. */}
      <Route path='/resetpass/:token' element={<ResetPass />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Routing
