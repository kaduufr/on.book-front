import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email é obrigatório'),
  password: yup.string().required('Senha invalida').min(6),
})
