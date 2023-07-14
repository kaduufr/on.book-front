import WrapperContent from '@/components/widgets/WrapperContent'
import useFetchCategories from '@hooks/useFetchCategories'
import { useEffect, useMemo, useState } from 'react'
import { createBookSchema } from '@schemas/books/create.books.schema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import BookService from '@services/BookService'
import Swal from 'sweetalert2'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'

export interface ICreateBookForm {
  title: string
  author: string
  category: number
  published_at: string
  description: string
  quantity: number
  image: File
  section: string
}

const CreateBooks = () => {
  const { categories } = useFetchCategories()
  const schemaMemo = useMemo(() => createBookSchema, [])
  const [isLoading, setIsLoading] = useState(false)

  const { push } = useRouter()

  const [image, setImage] = useState<File | null>(null)
  const {
    register,
    setValue,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
    resetField,
  } = useForm<Omit<ICreateBookForm, 'image'>>({
    resolver: yupResolver(schemaMemo),
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      title: '',
      author: '',
      category: '',
      published_at: '',
      description: '',
      quantity: 0,
      section: '',
    },
  })

  useEffect(() => {
    register('title')
    register('author')
    register('category')
    register('published_at')
    register('description')
    register('quantity')
    register('section')
  }, [])

  const { category, description, quantity, title, published_at, author, section } = watch()

  const buttonDisabled =
    !category ||
    !description ||
    !quantity ||
    !title ||
    !published_at ||
    !author ||
    !image ||
    !section

  function handleCreateBook(data: ICreateBookForm) {
    setIsLoading(true)

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('author', data.author)
    formData.append('category_id', data.category)
    formData.append('publishYear', data.published_at)
    formData.append('description', data.description)
    formData.append('quantity', String(data.quantity))
    formData.append('image', image)
    formData.append('section', data.section)

    BookService.createBook(formData)
      .then((response: AxiosResponse) => {
        Swal.fire({
          icon: 'success',
          title: 'Livro cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          push('/livros/' + response.data.id)
        })
      })
      .catch((error: AxiosError) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response?.data?.message || 'Erro ao cadastrar livro',
        })
      )
  }

  return (
    <WrapperContent>
      <h1 className="text-2xl font-medium mb-4">Novo livro</h1>

      <span className="text-sm text-red-400 mb-2">Obs: Todos os campos são obrigatórios</span>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateBook)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="title">
            Título <small className="font-bold text-red-600">*</small>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="input input-bordered"
            onChange={(event) => {
              setValue('title', event.target.value)
            }}
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="author">
            Autor <small className="font-bold text-red-600">*</small>
          </label>
          <input
            type="text"
            name="author"
            id="author"
            className="input input-bordered"
            onChange={(event) => {
              setValue('author', event.target.value)
            }}
          />
          {errors.author && <span className="text-red-500 text-sm">{errors.author.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category">
            Categoria <small className="font-bold text-red-600">*</small>
          </label>
          <select
            name="category"
            id="category"
            className="input input-bordered"
            onChange={(event) => {
              setValue('category', event.target.value)
            }}
          >
            <option value="">Selecione uma categoria</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
            {errors.category && (
              <span className="text-red-500 text-sm">{errors.category.message}</span>
            )}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="published_at">
            Ano de publicação <small className="font-bold text-red-600">*</small>
          </label>
          <input
            type="number"
            name="published_at"
            id="published_at"
            className="input input-bordered"
            onChange={(event) => {
              setValue('published_at', event.target.value)
            }}
          />
          {errors.published_at && (
            <span className="text-red-500 text-sm">{errors.published_at.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image_url">
            Imagem <small className="font-bold text-red-600">*</small>
          </label>
          <input
            type="file"
            name="image_url"
            id="image_url"
            className="file-input"
            onChange={(event) => {
              setImage(event.target.files[0])
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="quantity">
            Quantidade <small className="font-bold text-red-600">*</small>
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="input input-bordered"
            onChange={(event) => {
              setValue('quantity', event.target.value)
            }}
          />
          {errors.quantity && (
            <span className="text-red-500 text-sm">{errors.quantity.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="section">
            Seção <small className="font-bold text-red-600">*</small>
          </label>
          <input
            type="text"
            name="section"
            id="section"
            className="input input-bordered"
            onChange={(event) => {
              setValue('section', event.target.value)
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">
            Descrição <small className="font-bold text-red-600">*</small>
          </label>
          <textarea
            name="description"
            id="description"
            className="input input-bordered min-h-[100px]"
            onChange={(event) => {
              setValue('description', event.target.value)
            }}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 items-center justify-center my-5">
          <button type="submit" className="btn btn-success w-1/2" disabled={buttonDisabled}>
            Cadastrar
          </button>
        </div>
      </form>
    </WrapperContent>
  )
}

export default CreateBooks
