import { useCallback, useState } from 'react'
import BookService from '@services/BookService'
import IBook from '@interfaces/IBook'

export default function useFetchBooksByCategory() {
  const [books, setBooks] = useState<IBook[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState<number>(0)

  const handleFetchBooks = useCallback((category: string) => {
    setIsLoading(true)
    setError(null)
    setTotal(0)
    BookService.getBooksByCategory(category)
      .then((data) => {
        console.log(data)
        setBooks(data.books)
        setTotal(data._meta.total)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return {
    books,
    isLoading,
    error,
    handleFetchBooks,
    total,
  }
}
