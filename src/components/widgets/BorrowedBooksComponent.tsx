import { useEffect, useState } from 'react'
import { IBorrowedByBookFactory } from '@factories/BorrowByBookFactory'
import BookService from '@services/BookService'
import Loading from '@/components/widgets/Loading'
import { WarningIcon } from '@shared/icons'
import Swal from 'sweetalert2'

const BorrowedBooksComponent = ({ book_id }: { book_id: number }) => {
  const [borrows, setBorrows] = useState<IBorrowedByBookFactory[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>(null)
  const [alreadySearched, setAlreadySearched] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    BookService.getBorrowByBookId(book_id)
      .then((data) => {
        setBorrows(data)
      })
      .catch((error) => {
        setError('Erro ao carregar os exemplares emprestados')
      })
      .finally(() => {
        setLoading(false)
        setAlreadySearched(true)
      })
  }, [book_id])

  function handleReturnBook(evt: MouseEvent, borrow_id: number) {
    evt.preventDefault()
    Swal.fire({
      title: 'Confirmar devolução?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, confirmar!',
      cancelButtonText: 'Não, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        BookService.returnBook(borrow_id)
          .then(() => {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Exemplar devolvido com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            })

            setBorrows(borrows.filter((borrow) => borrow.id !== borrow_id))
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  if (borrows.length === 0 && alreadySearched) {
    return (
      <div className="alert bg-warn mt-6">
        <WarningIcon fill="white" size={22} />
        <span className="text-grayIce">Nenhum exemplar emprestado.</span>
      </div>
    )
  }

  return (
    <div className="mt-10 flex flex-col">
      <h2 className="font-medium text-xl mb-4">Exemplares emprestados</h2>

      <div className="flex flex-col">
        {borrows.map((borrow, index) => (
          <div className="flex flex-row gap-x-10 bg-gray-200 w-max p-4 rounded-xl mb-4" key={index}>
            <div>
              <p>
                <span className="font-bold">Usuario:</span> {borrow.user}
              </p>
              <p>
                <span className="font-bold">Data de emprestimo:</span> {borrow.createdAt}
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold">Data de devolução:</span> {borrow.dueDate}
              </p>
              <p>
                <span className="font-bold">Status:</span> {borrow.status}
              </p>
            </div>
            <div>
              <button
                className="btn btn-warning"
                onClick={(evt) => handleReturnBook(evt, borrow.id)}
              >
                <span className="text-grayIce">Registrar devolução</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BorrowedBooksComponent
