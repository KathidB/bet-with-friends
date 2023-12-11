import { useState } from 'react'
import NewPassword from './images/newpassword.webp'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import validate from '../validation/ResetPassValidation'
import { FaSpinner } from 'react-icons/fa'
// odpowiedzialny za pobieranie tokenu z adresu URL!
import { useParams, Link } from 'react-router-dom'

import './resetpass.css'

function ResetPass () {
  const [formError, setFormError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { token } = useParams()

  const handleSubmit = async (userData, { resetForm }) => {
    console.log(userData.password)
    console.log(token)
    try {
      setFormError(null)
      setSuccessMessage(null)
      setLoading(true)

      const response = await fetch('http://130.162.44.103:5000/api/v1/reset', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: userData.password,
          code: token
        })
      })
      setLoading(false)
      if (response.ok) {
        setFormError(null)
        console.log('POSZŁO!')
        resetForm({
          values: {
            password: '',
            confirmedPassword: ''
          }
        })
        setFormError(null)
        setSuccessMessage('Twoje hasło zostało zmienione')
      } else {
        const errorData = await response.json()
        console.log(errorData)

        if (errorData.code === 'PR3') {
          setFormError('Kod został zużyty lub się przedawnił')
        }
      }
    } catch (error) {
      setFormError('Coś się:', error)
    }
  }

  return (
    <section className='app-wrap'>
      <div className='login'>
        <h2 className='section-title'>
          Ustaw nowe <span className='span-brand'>hasło</span>
        </h2>

        <img
          src={NewPassword}
          className='raccon-login-img'
          alt=''
          width={250}
          height={250}
        />

        <div>
          <Formik
            initialValues={{
              password: '',
              confirmedPassword: ''
            }}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ touched, errors, dirty, isValid }) => (
              <Form className='form-signup newemail'>
                <label htmlFor='password'>Nowe hasło</label>
                <Field
                  type='password'
                  id='password'
                  name='password'
                  placeholder='*********'
                  className={
                    touched.password && errors.password
                      ? 'signup-input-error'
                      : ''
                  }
                />
                <ErrorMessage
                  name='password'
                  component='span'
                  className='signup-error-msg'
                />

                <label htmlFor='confirmedPassword'>Potwierdź nowe hasło</label>
                <Field
                  type='password'
                  id='confirmedPassword'
                  name='confirmedPassword'
                  placeholder='*********'
                  className={
                    touched.confirmedPassword && errors.confirmedPassword
                      ? 'signup-input-error'
                      : ''
                  }
                />
                <ErrorMessage
                  name='confirmedPassword'
                  component='span'
                  className='signup-error-msg'
                />

                <button
                  type='submit'
                  className='signup-submit-button'
                  disabled={!(dirty && isValid) || loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className='spinner-icon' />
                      Wysyłanie...
                    </>
                  ) : (
                    'Zmień hasło'
                  )}
                </button>

                {formError && (
                  <div className='signup--server-error-msg'>{formError}</div>
                )}
                {successMessage && (
                  <div className='signup-success-msg'>
                    {successMessage}{' '}
                    <Link to='/login' className='signup-login'>
                      Zaloguj się
                    </Link>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  )
}

export default ResetPass
