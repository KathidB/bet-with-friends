const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Field required'
  } else if (values.name.length < 3 || values.name.length > 20) {
    errors.name = 'Nick must have between 3 and 20 characters'
  } else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9]+$/.test(values.name)) {
    errors.name = 'Nick can contain letters, numbers, and Polish characters'
  }

  if (values.password.length < 8 || values.password.length > 50) {
    errors.password = 'The password must be at least 8 characters long'
  } else if (!/(?=.*[!@#$%^&*])/.test(values.password)) {
    errors.password = `The password must contain at least one special character !@#$%^&*().`
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'The passwords must be identical.'
  }

  if (!values.email) {
    errors.email = 'Field required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Wrong email adress'
  }

  return errors
}

export default validate
