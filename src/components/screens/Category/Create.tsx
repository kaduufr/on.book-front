import WrapperContent from '@/components/widgets/WrapperContent'
import { useForm } from 'react-hook-form'
import CategoryService, { ICreateCategoryForm } from '@services/CategoryService'
import { useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import { AxiosError } from 'axios'
import { createCategorySchema } from '@schemas/category/create.category.schema'
import { yupResolver } from '@hookform/resolvers/yup'

const CreateCategory = () => {
  const schemaMemo = useMemo(() => createCategorySchema, [])
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schemaMemo),
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: ICreateCategoryForm) => {
    setLoading(true)
    CategoryService.createCategory(data)
      .then((response) => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Categoria cadastrada com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          setValue('name', '')
          setValue('description', '')
        })
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao cadastrar categoria, verifique os campos e tente novamente.',
            icon: 'error',
            confirmButtonText: 'Ok',
          })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    register('name')
    register('description')
  }, [register])

  return (
    <WrapperContent>
      <h1 className="text-2xl font-bold mb-4">Nova Categoria</h1>

      <span className="text-sm text-red-400 mb-2">Obs: Todos os campos são obrigatórios</span>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">
            Nome <small className="font-bold text-red-600">*</small>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={watch('name')}
            className="input input-bordered"
            onChange={(event) => {
              setValue('name', event.target.value)
            }}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label htmlFor="description">
            Descrição <small className="font-bold text-red-600">*</small>
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={watch('description')}
            className="input input-bordered"
            onChange={(event) => {
              setValue('description', event.target.value)
            }}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description.message}</span>
          )}
        </div>
        <div className="w-full text-center mt-8">
          <button type="submit" className="btn btn-wide btn-success mx-auto" disabled={loading}>
            Cadastrar
          </button>
        </div>
      </form>
    </WrapperContent>
  )
}

export default CreateCategory
