import { useState } from 'react'
import MyPassword from './images/mypassword.webp'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import validate from '../validation/NewPasswordValidation'
import { FaSpinner } from 'react-icons/fa'

import './newpassword.css'

function NewPassword () {
  const [successMessage, setSuccessMessage] = useState(null)
  const [serverError, setServerError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (userData, { resetForm }) => {
    console.log(userData.email)

    try {
      setLoading(true)
      setSuccessMessage('')
      const response = await fetch('http://130.162.44.103:5000/api/v1/reset', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userData.email
        })
      })
      setLoading(false)
      if (response.ok) {
        setServerError(false)

        resetForm({
          values: {
            email: ''
          }
        })
        setSuccessMessage(
          'Instrukcja resetowania hasła została wysłana na podany email.'
        )
      } else {
        const errorData = await response.json()
        console.log(errorData)
        setServerError(true)
      }
    } catch (error) {
      setServerError(true)
    }
  }

  return (
    <section className='app-wrap'>
      <div className='login'>
        <h2 className='section-title'>
          Przypomnij <span className='span-brand'>hasło</span>
        </h2>

        <img
          src={MyPassword}
          className='raccon-login-img'
          alt=''
          width={250}
          height={250}
        />

        <div>
          <Formik
            initialValues={{
              email: ''
            }}
            validate={validate}
            onSubmit={handleSubmit}
            className='form-login newemail'
          >
            {formik => (
              <Form className='newemail'>
                <label htmlFor='email' className='newemail-label'>
                  Email
                </label>
                <Field
                  id='email'
                  name='email'
                  placeholder='Email...'
                  type='email'
                  className={`${'newemail-input'}
                    formik.touched.email && formik.errors.email
                      ? 'login-input-error'
                      : ''
                  `}
                />
                <ErrorMessage
                  name='email'
                  component='span'
                  className='login-error-msg'
                />
                <button
                  className='newemail-btn'
                  type='submit'
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  {loading ? (
                    <>
                      <FaSpinner className='spinner-icon' />
                      Przesyłanie...
                    </>
                  ) : (
                    'Reset hasła'
                  )}
                </button>
                {successMessage && (
                  <div className='signup-success-msg'>{successMessage}</div>
                )}
                {serverError && (
                  <p className='login-error-msg'>Brak emaila w systemie</p>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  )
}

export default NewPassword
