import { useState } from 'react'
import NewPassword from './images/newpassword.webp'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import validate from '../validation/ResetPassValidation'
import { FaSpinner } from 'react-icons/fa'
// odpowiedzialny za pobieranie tokenu z adresu URL!
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import './resetpass.css'

function ResetPass () {
  const { t } = useTranslation()
  const [formError, setFormError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { token } = useParams()

  const handleSubmit = async (userData, { resetForm }) => {
    try {
      setFormError(null)
      setSuccessMessage(null)
      setLoading(true)

      const response = await fetch('http://4.184.219.209:5000/api/v1/reset', {
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
        resetForm({
          values: {
            password: '',
            confirmedPassword: ''
          }
        })
        setFormError(null)
        setSuccessMessage(`${t('passreset.success')}`)
      } else {
        const errorData = await response.json()
        console.log(errorData)

        if (errorData.code === 'PR3') {
          setFormError(`${t('passreset.error')}`)
        }
      }
    } catch (error) {
      setFormError('Server:', error)
    }
  }

  return (
    <section className='app-wrap'>
      <div className='login'>
        <h2 className='section-title'>
          {t('resetpass.passA')}{' '}
          <span className='span-brand'> {t('resetpass.passB')}</span>
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
                <label htmlFor='password'>{t('passreset.newpass')}</label>
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

                <label htmlFor='confirmedPassword'>
                  {t('passreset.confirmNP')}
                </label>
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
                      {t('passreset.status')}
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
                      {t('signup.acc2')}
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
