import { useState } from 'react'
import validate from '../validation/ResetPassValidation'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { FaSpinner } from 'react-icons/fa'
import { useAuth } from '../authcontext/AuthContext'

import './panelpassreset.css'

function PanelPassReset () {
  const { ipMan } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleSubmit = async (userData, { resetForm }) => {
    try {
      setFormError(null)
      setSuccessMessage(null)
      setLoading(true)

      const response = await fetch(`http://${ipMan}:5000/api/v1/profile`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: userData.password
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
      setFormError('Błędna odpowiedź serwera:', error)
    }
  }

  return (
    <>
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
                touched.password && errors.password ? 'signup-input-error' : ''
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
              <div className='signup-success-msg'>{successMessage}</div>
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}

export default PanelPassReset
