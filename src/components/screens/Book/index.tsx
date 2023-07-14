import { memo, useEffect, useState } from 'react'
import WrapperContent from '@/components/widgets/WrapperContent'
import useFetchAllBooks from '@hooks/useFetchAllBooks'
import Image from 'next/image'
import { CloseIcon } from '@shared/icons'
import Swal from 'sweetalert2'
import BookService from '@services/BookService'
import IBook from '@interfaces/IBook'
import Link from 'next/link'

const BooksIndex = () => {
  const { data: bookList } = useFetchAllBooks()
  const [books, setBooks] = useState<IBook[]>([])

  useEffect(() => {
    if (bookList) setBooks(bookList)
  }, [bookList])

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

  return (
    <WrapperContent>
      <div className="flex flex-row items-center justify-between w-full mb-4">
        <h1 className="text-2xl font-bold">Books</h1>

        <Link href={`/livros/cadastrar`}>
          <button className="py-2 px-4 rounded-lg bg-primary hover:bg-primary hover:brightness-95 text-grayIce">
            Cadastrar novo livro
          </button>
        </Link>
      </div>

      <div className="flex flex-row flex-wrap w-full">
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
            </div>
          </div>
        ))}
      </div>
    </WrapperContent>
  )
}

export default memo(BooksIndex)
