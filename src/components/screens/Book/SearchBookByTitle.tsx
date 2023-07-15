import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BookService from '@services/BookService'
import IBook from '@interfaces/IBook'
import Swal from 'sweetalert2'
import WrapperContent from '@/components/widgets/WrapperContent'
import Link from 'next/link'
import Image from 'next/image'
import { CloseIcon, WarningIcon } from '@shared/icons'
import Loading from '@/components/widgets/Loading'
import useUserLogged from '@hooks/useUserLogged'

const SearchBookByTitle = () => {
  const { query, back, replace } = useRouter()
  const { title } = query as { title: string }
  const [books, setBooks] = useState<IBook[]>([])
  const [total, setTotal] = useState<number>(0)
  const [alreadyLoaded, setAlreadyLoaded] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { isAdmin, isLogged } = useUserLogged()

  useEffect(() => {
    if (title) {
      setLoading(true)
      BookService.getBooksByTitle(title)
        .then((data) => {
          setBooks(data.books)
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao carregar livros, tente novamente mais tarde.',
            icon: 'error',
            confirmButtonText: 'Ok',
          }).then(() => {
            back()
          })
        })
        .finally(() => {
          setLoading(false)
          setAlreadyLoaded(true)
        })
    }
  }, [title])

  function handleDeleteBook(id: number) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, delete!',
      cancelButtonText: 'Não, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        BookService.deleteBook(id)
          .then(() => {
            setBooks(books.filter((book: IBook) => book.id !== id))
            Swal.fire('Deletado!', 'O livro foi deletado com sucesso.', 'success')
          })
          .catch(() => {
            Swal.fire('Erro!', 'Ocorreu um erro ao deletar o livro.', 'error')
          })
      }
    })
  }

  if (!title) {
    replace('/livros')
    return <div></div>
  }

  if (!alreadyLoaded && loading) {
    return <Loading />
  }

  if (books.length === 0 && alreadyLoaded) {
    return (
      <WrapperContent>
        <h1 className="text-2xl">Pesquisa: {title ?? ''} </h1>
        <div>
          <div className="alert bg-warn mt-6">
            <WarningIcon fill="white" size={22} />
            <span className="text-grayIce">Nenhum livro encontrado!</span>
          </div>
        </div>
      </WrapperContent>
    )
  }

  return (
    <WrapperContent>
      <h1 className="text-2xl font-bold">Pesquisa: {title ?? ''} </h1>

      <div className="flex flex-row flex-wrap w-full mt-4">
        {books?.map((book, index) => (
          <div key={index} className="flex flex-row w-1/3 p-2">
            <Link href={`/livros/${book.id}`}>
              <Image
                width={80}
                height={120}
                src={`http://localhost:3000${book.image_url}`}
                alt={book.title}
                className="min-w-[80px] h-[120px]"
              />
            </Link>
            <div className="flex flex-col justify-between pl-2">
              <Link href={`/livros/${book.id}`}>
                <div>
                  <p className="text-md font-bold">{book.title}</p>
                  <p className="text-sm">De: {book.author}</p>
                </div>
              </Link>
              {isLogged && isAdmin && (
                <div className="flex flex-row gap-x-4">
                  <Link href={`/livros/editar/${book.id}`}>
                    <button className="btn btn-success btn-sm text-grayIce" title="Editar livro">
                      Editar
                    </button>
                  </Link>
                  <button
                    className="btn btn-error btn-sm"
                    title="Excluir livro"
                    onClick={(event) => {
                      event.preventDefault()
                      handleDeleteBook(book.id)
                    }}
                  >
                    <CloseIcon size={30} className="text-grayIce" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </WrapperContent>
  )
}

export default SearchBookByTitle
