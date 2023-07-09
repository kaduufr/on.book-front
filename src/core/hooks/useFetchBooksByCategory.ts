import { useCallback, useState } from 'react'
import BookService from '@services/BookService'
import IBook from '@interfaces/IBook'

export default function useFetchBooksByCategory() {
  const [books, setBooks] = useState<IBook[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState<number>(0)
  const [alreadyFetched, setAlreadyFetched] = useState<boolean>(false)

  const handleFetchBooks = useCallback((category: string) => {
    setIsLoading(true)
    setError(null)
    setTotal(0)
    setAlreadyFetched(false)
    BookService.getBooksByCategory(category)
      .then((data) => {
        setBooks(data.books)
        setTotal(data._meta.total)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
        setAlreadyFetched(true)
      })
  }, [])

  return {
    books,
    isLoading,
    error,
    handleFetchBooks,
    total,
    alreadyFetched,
  }
}
