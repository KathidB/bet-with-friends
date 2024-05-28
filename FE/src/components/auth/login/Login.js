import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import validate from '../validation/LogInValidations'
import RaccoonLogin from './images/raccoon-login3.webp'
import { ScrollToTop } from '../../utilities/ScrollToTop'
import { FaSpinner } from 'react-icons/fa'
import { useAuth } from '../authcontext/AuthContext'
import './login.css'
import { useTranslation } from 'react-i18next'

function Login () {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, ipMan } = useAuth()
  const [loginError, setLoginError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (userData, { resetForm }) => {
    setLoginError(null)
    try {
      setLoading(true)

      const response = await fetch(`http://${ipMan}:5000/api/v1/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      setLoading(false)

      if (response.ok) {
        // Czyszczenie formularza po udanym logowaniu
        resetForm({
          values: {
            email: '',
            password: ''
          }
        })

        // Wyczyszczenie błędu po udanym logowaniu
        setLoginError(null)

        login()

        // Navigate after login
        navigate('/panel')
      } else {
        // Obsługa błędów, np. wyświetlenie komunikatu użytkownikowi

        // Spróbuj sparsować błąd jako JSON, jeśli to możliwe
        const errorData = await response.json()

        if (errorData.code === 'L1') {
          throw new Error(`Wrong password or username.`)
        } else {
          throw new Error(`Activate your account first.`)
        }
      }
    } catch (error) {
      setLoginError(error.message || 'Error.')
    }
  }

  return (
    <section className='app-wrap'>
      <div className='login'>
        <h2 className='section-title'>
          {t('login.headerA')}{' '}
          <span className='span-brand'> {t('login.headerB')}</span>
        </h2>

        <link rel='preload' as='image' href={RaccoonLogin} />
        <img
          className='raccon-login-img'
          src={RaccoonLogin}
          alt=''
          width={250}
          height={250}
        />

        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {formik => (
            <Form className='form-login'>
              <p className='form-parag'> {t('login.info')} </p>
              <label htmlFor='email'>{t('login.email')}</label>
              <Field
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                autoComplete='email'
                className={
                  formik.touched.email && formik.errors.email
                    ? 'login-input-error'
                    : ''
                }
              />
              <ErrorMessage
                name='email'
                component='span'
                className='login-error-msg'
              />

              <label htmlFor='password'>{t('login.password')}</label>
              <Field
                type='password'
                id='password'
                name='password'
                placeholder='*********'
                autoComplete='current-password'
              />
              <ErrorMessage
                name='password'
                component='span'
                className='login-error-msg'
              />

              <button
                type='submit'
                className='login-submit-button'
                disabled={!(formik.dirty && formik.isValid)}
              >
                {loading ? (
                  <>
                    <FaSpinner className='spinner-icon' />
                    {t('login.cta')}...
                  </>
                ) : (
                  `${t('login.cta')}`
                )}
              </button>

              {loginError && (
                <div className='login-server-error-msg'>{loginError}</div>
              )}
              <div className='new-pass'>
                <Link
                  to='/newpassword'
                  className='signup-login'
                  onClick={ScrollToTop}
                >
                  {t('login.passrec')}
                </Link>
              </div>
            </Form>
          )}
        </Formik>

        <div className='form-to-signup'>
          <div>
            <span> {t('login.noacc1')}</span>
            <Link to='/signup' className='signup-login' onClick={ScrollToTop}>
              {t('login.noacc2')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
