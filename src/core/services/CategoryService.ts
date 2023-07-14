import OnBookApi from '@http/OnBookApi'
import CategoriesFactory, { ICategoriesFactory } from '@factories/CategoriesFactory'

export interface ICreateCategoryForm {
  name: string
  description: string
}

export default class CategoryService {
  static getAllCategories(): Promise<ICategoriesFactory[]> {
    return OnBookApi.get('/categories').then((response) => CategoriesFactory.builder(response.data))
  }

  static createCategory(data: FormData): Promise<ICategoriesFactory> {
    return OnBookApi.post('/categories', data)
  }

  static updateCategory(id: number, data: FormData): Promise<ICategoriesFactory> {
    return OnBookApi.put(`/categories/${id}`, data)
  }
  x
  static deleteCategory(id: number): Promise<ICategoriesFactory> {
    return OnBookApi.delete(`/categories/${id}`)
  }

  static getCategory(id: number): Promise<ICategoriesFactory[]> {
    return OnBookApi.get(`/categories/${id}`).then((response) =>
      CategoriesFactory.builder(response.data)
    )
  }
}
