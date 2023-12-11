const validate = values => {
  const errors = {}

  if (values.password.length < 8) {
    errors.password = 'Hasło musi mieć co najmniej 8 znaków'
  } else if (!/(?=.*[!@#$%^&*])/.test(values.password)) {
    errors.password = `Hasło musi zawierać co najmniej jeden znak specjalny (!@#$%^&*)`
  }

  if (values.password !== values.confirmedPassword) {
    errors.confirmedPassword = 'Hasła muszą być identyczne'
  }

  return errors
}

export default validate
