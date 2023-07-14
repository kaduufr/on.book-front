import WrapperContent from '../../widgets/WrapperContent'
import useFetchCategories from '@hooks/useFetchCategories'
import Loading from '@/components/widgets/Loading'
import Link from 'next/link'
import { CloseIcon } from '@shared/icons'
import useUserLogged from '@hooks/useUserLogged'
import { FaPen } from 'react-icons/fa'
import Swal from 'sweetalert2'
import CategoryService from '@services/CategoryService'

const colors = [
  '#a5dae6',
  '#fee3b8',
  '#bde4e5',
  '#a0d995',
  '#b9b2db',
  '#ffaba8',
  '#a2edce',
  '#d3bead',
  '#ee8fab',
]

const CategoriesScreen = () => {
  const { isLoading, categories, setCauseNewRequest } = useFetchCategories()
  const { isLogged, isAdmin } = useUserLogged()

  const handleDeleteCategory = (id: number) => {
    Swal.fire({
      title: 'Tem certeza que deseja deletar essa categoria?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, delete!',
      cancelButtonText: 'Não, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        CategoryService.deleteCategory(id)
          .then(() => {
            Swal.fire('Deletado!', 'A categoria foi deletada com sucesso.', 'success')
            setCauseNewRequest(true)
          })
          .catch(() => {
            Swal.fire('Erro!', 'Ocorreu um erro ao deletar a categoria.', 'error')
          })
      }
    })
  }

  if (isLoading) {
    return (
      <WrapperContent>
        <h1>Categorias</h1>
        <div>
          <p>Carregando...</p>
          <Loading />
        </div>
      </WrapperContent>
    )
  }

  return (
    <WrapperContent>
      <div className="flex flex-row items-center justify-between w-full mb-8">
        <h1 className="text-2xl font-bold">Categorias</h1>

        {isLogged && isAdmin && (
          <Link href={`/categorias/nova`}>
            <button className="py-2 px-4 rounded-lg bg-primary hover:bg-primary hover:brightness-95 text-grayIce transition-all">
              Cadastrar nova categoria
            </button>
          </Link>
        )}
      </div>
      <div className="flex flex-row flex-wrap gap-4 items-center w-full">
        {categories.map((category, index) => {
          let position = index
          if (index > 8) {
            position = index % 8
          }
          const bgColorRandom = colors[position]

          if (!category.active && !isAdmin) {
            return null
          }

          return (
            <div key={category.id} className="relative">
              {isLogged && isAdmin && (
                <div className="flex flex-row items-center top-1 right-2 absolute z-20">
                  {!category.active && <small>Inativa</small>}
                  <Link href={`/categorias/editar/${category.id}`}>
                    <div className="w-8 h-8 flex justify-center items-center rounded-full">
                      <FaPen />
                    </div>
                  </Link>
                  {/*<button*/}
                  {/*  title="Deletar categoria"*/}
                  {/*  onClick={() => handleDeleteCategory(category.id)}*/}
                  {/*  className="flex justify-center items-center rounded-full "*/}
                  {/*>*/}
                  {/*  <CloseIcon size={36} className="text-red-800" />*/}
                  {/*</button>*/}
                </div>
              )}
              <Link href={`/livros/categorias/${category.id}`}>
                <div
                  key={category.id}
                  className={`w-[260px] h-[140px] rounded-xl text-primary font-bold flex justify-center items-center bg-[${bgColorRandom}] ${
                    !category.active && '!bg-gray-300'
                  }`}
                >
                  <p className="text-xl">{category.name}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
      {/*<div className="absolute bottom-4 right-4">*/}
      {/*  <Link href={`/categorias/nova`}>*/}
      {/*    <button className="btn btn-circle bg-blueDark text-grayIce w-[60px] h-[60px]">*/}
      {/*      <span className="material-icons">*/}
      {/*        <CloseIcon size={50} className="text-grayIce rotate-45" />*/}
      {/*      </span>*/}
      {/*    </button>*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </WrapperContent>
  )
}

export default CategoriesScreen
