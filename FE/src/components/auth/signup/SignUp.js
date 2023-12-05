import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { FaSpinner } from 'react-icons/fa'
import validate from '../validation/SignUpValidation'
import RaccoonSignUp from './images/raccoon-signup.webp'
import { ScrollToTop } from '../../utilities/ScrollToTop'
import './signup.css'

function SignUp () {
  const [formError, setFormError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (userData, { resetForm }) => {
    try {
      setFormError(null)
      setSuccessMessage(null)
      setLoading(true)

      const userDataSending = {
        name: userData.name,
        password: userData.password,
        email: userData.email
      }

      const response = await fetch(
        'http://130.162.44.103:5000/api/v1/register',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userDataSending)
        }
      )

      setLoading(false) // Zakończenie ładowania po otrzymaniu odpowiedzi

      if (response.ok) {
        resetForm({
          values: {
            name: '',
            password: '',
            confirmPassword: '',
            email: ''
          }
        })
        setFormError(null)
        setSuccessMessage(
          'Rejestracja zakończona sukcesem, aktywuj swoje konto poprzez email.'
        )
      } else {
        const errorData = await response.json()

        if (errorData.code === 'R1') {
          throw new Error(`Adres email jest zajęty.`)
        } else {
          throw new Error(`Nazwa użytkownika jest zajęta.`)
        }
      }
    } catch (error) {
      setFormError(error.message || 'Wystąpił błąd podczas rejestracji.')
    }
  }

  return (
    <section className='app-wrap'>
      <div className='signup'>
        <h2 className='section-title'>
          Sign <span className='span-brand'>Up</span>
        </h2>

        <link rel='preload' as='image' href={RaccoonSignUp} />

        <img
          className='raccon-signup-img'
          src={RaccoonSignUp}
          alt=''
          width={250}
          height={250}
        />

        <Formik
          initialValues={{
            name: '',
            password: '',
            confirmPassword: '',
            email: ''
          }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, dirty, isValid }) => (
            <Form className='form-signup'>
              <p>Stwórz konto i dołącz do społeczności!</p>

              <label htmlFor='email'>Email</label>
              <Field
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                className={
                  touched.email && errors.email ? 'signup-input-error' : ''
                }
              />
              <ErrorMessage
                name='email'
                component='span'
                className='signup-error-msg'
              />

              <label htmlFor='name'>Nazwa użytkownika</label>
              <Field
                type='text'
                id='name'
                name='name'
                max={20}
                placeholder='Nazwa użytkownika'
                className={
                  touched.name && errors.name ? 'signup-input-error' : ''
                }
              />
              <ErrorMessage
                name='name'
                component='span'
                className='signup-error-msg'
              />

              <label htmlFor='password'>Hasło</label>
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

              <label htmlFor='confirmPassword'>Potwierdź hasło</label>
              <Field
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                placeholder='*********'
                className={
                  touched.confirmPassword && errors.confirmPassword
                    ? 'signup-input-error'
                    : ''
                }
              />
              <ErrorMessage
                name='confirmPassword'
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
                  'Stwórz konto'
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

        <div className='form-to-login'>
          Posiadasz już konto?
          <Link to='/login' className='signup-login' onClick={ScrollToTop}>
            Zaloguj się
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SignUp
