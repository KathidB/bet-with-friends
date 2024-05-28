const validate = values => {
  const errors = {}

  if (values.password.length < 8) {
    errors.password = 'The password must be at least 8 characters long'
  } else if (!/(?=.*[!@#$%^&*])/.test(values.password)) {
    errors.password = `The password must contain at least one special character !@#$%^&*()`
  }

  if (values.password !== values.confirmedPassword) {
    errors.confirmedPassword = 'The passwords must be identical'
  }

  return errors
}

export default validate
