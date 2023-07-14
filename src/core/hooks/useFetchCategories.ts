import { useEffect, useState } from 'react'
import { ICategoriesFactory } from '@factories/CategoriesFactory'
import CategoryService from '../services/CategoryService'

export default function useFetchCategories() {
  const [categories, setCategories] = useState<ICategoriesFactory[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [causeNewRequest, setCauseNewRequest] = useState<boolean>(true)

  useEffect(() => {
    if (!causeNewRequest) return
    CategoryService.getAllCategories()
      .then((data) => {
        setCategories(data)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
      .finally(() => {
        setCauseNewRequest(false)
      })
  }, [causeNewRequest])

  return {
    categories,
    isLoading,
    error,
    setCauseNewRequest,
  }
}
