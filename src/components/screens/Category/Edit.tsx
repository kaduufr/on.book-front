import { useForm } from 'react-hook-form'
import { useEffect, useMemo, useState } from 'react'
import CategoryService from '@services/CategoryService'
import Swal from 'sweetalert2'
import { AxiosError } from 'axios'
import WrapperContent from '@/components/widgets/WrapperContent'
import { useRouter } from 'next/router'
import { editCategorySchema } from '@schemas/category/edit.category.schema'
import { yupResolver } from '@hookform/resolvers/yup'

export interface IUpdateCategoryForm {
  name: string
  description: string
  active: number
}

const EditCategory = () => {
  const schemaMemo = useMemo(() => editCategorySchema, [])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IUpdateCategoryForm>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schemaMemo),
  })

  const { query, back } = useRouter()
  const { id } = query as { id: number }

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    CategoryService.getCategory(id)
      .then(([response]) => {
        setValue('name', response.name)
        setValue('description', response.description)
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao carregar categoria, tente novamente mais tarde.',
            icon: 'error',
            confirmButtonText: 'Ok',
          }).then(() => {
            back()
          })
        }
      })
  }, [id])

  const onSubmit = async (data: IUpdateCategoryForm) => {
    setLoading(true)
    const body = {
      name: data.name,
      description: data.description,
      active: data.active === 1,
    }
    CategoryService.updateCategory(id, data)
      .then((response) => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Categoria atualizada com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          setValue('name', '')
          setValue('description', '')
          setValue('active', 1)
          back()
        })
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao atualizar categoria, verifique os campos e tente novamente.',
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
      <h1 className="text-2xl font-bold mb-4">Editar Categoria</h1>

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
        <div className="flex flex-col gap-2 mt-2">
          <label htmlFor="description">
            Ativo <small className="font-bold text-red-600">*</small>
          </label>
          <select
            name="active"
            id="active"
            className="input input-bordered"
            {...register('active')}
          >
            <option value="1">Sim</option>
            <option value="0">Não</option>
          </select>
        </div>
        <div className="w-full text-center mt-8">
          <button type="submit" className="btn btn-wide btn-success mx-auto" disabled={loading}>
            Editar
          </button>
        </div>
      </form>
    </WrapperContent>
  )
}

export default EditCategory
