import WrapperContent from '@/components/widgets/WrapperContent'
import { useRouter } from 'next/router'
import useFetchBooksByCategory from '@hooks/useFetchBooksByCategory'
import { useEffect } from 'react'
import useFetchCategories from '@hooks/useFetchCategories'
import { BookIcon, WarningIcon } from '@shared/icons'
import Image from 'next/image'
import Link from 'next/link'
import routes from '@data/routes'

type QueryParams = {
  id: string
}

const ListBookByCategory = () => {
  const { id } = useRouter().query as QueryParams

  const { handleFetchBooks, books, total, alreadyFetched } = useFetchBooksByCategory()
  const { categories } = useFetchCategories()

  const categorieFiltered = categories?.find((category) => category.id === Number(id))

  useEffect(() => {
    if (!id) return
    handleFetchBooks(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <WrapperContent>
      <div className="flex flex-col flex-wrap">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <BookIcon className="mr-2" size={22} />
            <h1 className="text-2xl">{categorieFiltered?.name}</h1>
          </div>
          <div className="mr-2">
            <p className="text-md">
              Total: <b>{total} Livros</b>
            </p>
          </div>
        </div>
        <div className="flex flex-row flex-wrap lg:gap-x-16 items-start pt-2">
          {books?.map((book, indexBook) => (
            <div className="flex flex-row pt-4" key={indexBook}>
              <Link href={`${routes.books}/${book.id}`}>
                <div className="flex flex-col items-center justify-center max-w-[250px]">
                  <Image
                    width={160}
                    height={230}
                    src={`http://localhost:3000${book.image_url}`}
                    alt={'book_image'}
                    className="h-[230px] w-[160px] object-cover"
                  />
                  <p className="font-normal text-center pt-1">{book.title}</p>
                  <small className="font-thin">{book.available}</small>
                </div>
              </Link>
            </div>
          ))}

          {!books?.length && alreadyFetched && (
            <div className="alert bg-warn mt-6">
              <WarningIcon fill="white" size={22} />
              <span className="text-grayIce">Nenhum livro encontrado!</span>
            </div>
          )}
        </div>
      </div>
    </WrapperContent>
  )
}

export default ListBookByCategory
