import { useEffect, useState } from 'react'
import { ICategoriesFactory } from '@factories/CategoriesFactory'
import CategoryService from '../services/CategoryService'

export default function useFetchCategories() {
  const [categories, setCategories] = useState<ICategoriesFactory[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    CategoryService.getAllCategories()
      .then((data) => {
        setCategories(data)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }, [])

  return {
    categories,
    isLoading,
    error,
  }
}
