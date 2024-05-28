const validate = values => {
  const errors = {}

  if (values.password.length < 8) {
    errors.password =
      'The password must be at least 8 characters long and contain one special character (!@#$%^&*)'
  } else if (!/(?=.*[!@#$%^&*])/.test(values.password)) {
    errors.password =
      'The password must contain at least one special character (!@#$%^&*)'
  }

  if (!values.email) {
    errors.email = 'Field required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Wrong email adress'
  }

  return errors
}

export default validate
