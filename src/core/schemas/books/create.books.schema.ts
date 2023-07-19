import * as yup from 'yup'

export const createBookSchema = yup.object().shape({
  title: yup.string().required('Titulo é obrigatório'),
  description: yup.string().required('Descrição é obrigatório'),
  author: yup.string().required('Autor é obrigatório'),
  published_at: yup.string().required('Data de publicação é obrigatório'),
  category: yup.number().required('Categoria é obrigatório'),
  quantity: yup.number().required('Quantidade é obrigatório'),
  section: yup.string().required('Seção é obrigatório'),
})
