import WrapperContent from '@/components/widgets/WrapperContent'
import { BookIcon } from '@shared/icons'
import IBook from '@interfaces/IBook'
import Image from 'next/image'
import useUserLogged from '@hooks/useUserLogged'
import BookService, { BorrowBookType } from '@services/BookService'
import { MouseEvent, useState } from 'react'
import Swal from 'sweetalert2'
import Loading from '@/components/widgets/Loading'
import { UserTypeEnum } from '@features/userSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import routes from '@data/routes'
import BorrowedBooksComponent from '@/components/widgets/BorrowedBooksComponent'

type Props = {
  book: IBook
}

function addDays(date: Date, days: number) {
  date.setDate(date.getDate() + days)
  return date
}

const ShowBookComponent = ({ book }: Props) => {
  const { isLogged, user_id, type } = useUserLogged()
  const [loading, setLoading] = useState(false)

  const isAdmin = type === UserTypeEnum.admin
  const { push } = useRouter()

  const handleReserveBook = async (evt: MouseEvent) => {
    const data: BorrowBookType = {
      book_id: book.id,
      user_id,
      due_date: addDays(new Date(), 7).toISOString(),
    }
    setLoading(true)

    BookService.borrowBook(data)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Livro reservado com sucesso!',
          showConfirmButton: false,
          timer: 1500,
        })
      })
      .catch((error: AxiosError) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response?.data?.message || 'Erro ao reservar livro',
        })
      )
      .finally(() => setLoading(false))
  }

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
            Swal.fire('Deletado!', 'O livro foi deletado com sucesso.', 'success').then(() =>
              push(routes.books)
            )
          })
          .catch(() => {
            Swal.fire('Erro!', 'Ocorreu um erro ao deletar o livro.', 'error')
          })
      }
    })
  }

  return (
    <WrapperContent>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <BookIcon size={22} className="mr-2" />
            <h1 className="text-2xl font-bold">{book.title}</h1>
          </div>
          {isLogged && !isAdmin && (
            <button className="btn bg-yellowTheme" onClick={handleReserveBook}>
              <span className="text-grayIce">Reservar</span>
            </button>
          )}
          {isLogged && isAdmin && (
            <div className="flex flex-row items-center">
              <Link href={`/livros/editar/${book.id}`}>
                <button className="btn btn-success">
                  <span className="text-grayIce">Editar</span>
                </button>
              </Link>
              <button className="btn btn-error ml-2" onClick={() => handleDeleteBook(book.id)}>
                <span className="text-grayIce">Excluir</span>
              </button>
            </div>
          )}
        </div>
        {loading && <Loading />}
        <div className="flex flex-col md:flex-row pt-8">
          <div className="">
            <Image
              src={`http://localhost:3000${book.image_url}`}
              alt="bookPicture"
              height="1000"
              width="800"
              className="w-auto min-w-[260px] max-h-[500]"
            />
          </div>
          <div className="flex flex-col w-full mt-6 md:mt-0 ml-6">
            <div className="w-full">
              <p className="text-lg mb-1">
                <b>Autor / Autora:</b>
              </p>
              <p className="bg-gray-200 p-2 text-md rounded-xl w-max md:w-1/2">{book.author}</p>
            </div>
            <div className="w-full pt-2">
              <p className="text-lg mb-1">
                <b>Categoria:</b>
              </p>
              <p className="bg-gray-200 p-2 text-md rounded-xl w-max md:w-1/2">
                {book.category_name}
              </p>
            </div>
            <div className="w-full pt-2">
              <p className="text-lg mb-1">
                <b>Ano de Publicação:</b>
              </p>
              <p className="bg-gray-200 p-2 text-md rounded-xl w-max md:w-1/2">
                {book.published_at}
              </p>
            </div>
            <div className="w-full pt-2">
              <p className="text-lg mb-1">
                <b>Descrição:</b>
              </p>
              <p className="bg-gray-200 p-2 text-md rounded-xl w-max md:w-1/2">
                {book.description}
              </p>
            </div>
            <div className="w-full pt-2">
              <p className="text-lg mb-1">
                <b>Status:</b>
              </p>
              <p className="bg-gray-200 p-2 text-md rounded-xl w-max md:w-1/2">{book.available}</p>
            </div>
          </div>
        </div>
      </div>
      {isLogged && isAdmin && book.id && <BorrowedBooksComponent book_id={book.id} />}
    </WrapperContent>
  )
}

export default ShowBookComponent
