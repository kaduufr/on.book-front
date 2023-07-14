import * as yup from 'yup'

export const editCategorySchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Descrição é obrigatório'),
  active: yup.number().oneOf([0, 1]).required('Ativo é obrigatório'),
})
