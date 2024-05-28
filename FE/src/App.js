import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './MainLayout'
import Panel from './components/pages/postLogin/Panel'
import { AuthProvider } from './components/auth/authcontext/AuthContext'
import './locales/i18n'

import './index.css'

function App () {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/*' element={<MainLayout />} />

        <Route path='/panel/*' element={<Panel />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
