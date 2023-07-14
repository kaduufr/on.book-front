import * as yup from 'yup'

export const createCategorySchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Descrição é obrigatório'),
})
