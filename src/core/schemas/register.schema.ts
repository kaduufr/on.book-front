import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  email: yup.string().email().required('Email é obrigatório'),
  password: yup.string().required('Senha invalida').min(6),
  name: yup.string().required('Nome é obrigatório'),
  document: yup.string().required('CPF é obrigatório'),
})
