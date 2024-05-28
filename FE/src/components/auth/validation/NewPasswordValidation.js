const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Field required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Wrong email adress'
  }

  return errors
}

export default validate
