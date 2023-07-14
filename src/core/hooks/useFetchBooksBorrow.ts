import {IBookBorrowFactory} from "@factories/BooksBorrowedFactory";
import {useEffect, useState} from "react";
import BookService from "@services/BookService";

export default function useFetchBooksBorrow() {
  const [data, setData] = useState<IBookBorrowFactory[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>(null)
  const [info, setInfo] = useState<string>(null)

  useEffect(() => {
    setLoading(true)
    BookService.getBooksBorrowed()
      .then((response) => {
        if (response.length === 0) {
          setInfo('Nenhum livro emprestado')
          return
        }
        setData(response)
      })
      .catch(() => setError('Erro ao buscar livros emprestados'))
      .finally(() => setLoading(false))
  }, [])

  return {
    data,
    loading,
    error
  }
}
