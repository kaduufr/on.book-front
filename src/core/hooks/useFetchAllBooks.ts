import {useEffect, useState} from "react";
import BookService from "@services/BookService";
import IBook from "@interfaces/IBook";

export default function useFetchAllBooks() {
  const [data, setData] = useState<IBook[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    BookService.getAllBooksWithoutFilter()
      .then((response) => {
        if (response.books.length === 0) {
          setMessage('Nenhum livro encontrado')
          return
        }
        setData(response.books)
        setTotal(response._meta.total)
      } )
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  },[])

  return {data, isLoading, error, message, total}
}
