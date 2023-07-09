import OnBookApi from '@http/OnBookApi'
import CategoriesFactory, { ICategoriesFactory } from '@factories/CategoriesFactory'

export default class CategoryService {
  static getAllCategories(): Promise<ICategoriesFactory[]> {
    return OnBookApi.get('/categories').then((response) => CategoriesFactory.builder(response.data))
  }
}
