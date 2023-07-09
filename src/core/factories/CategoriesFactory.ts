type DataApi = {
  id: number
  name: string
  description: string
}

export interface ICategoriesFactory {
  id: number
  name: string
  description: string
}

export default class CategoriesFactory {
  static builder(data: DataApi[]): ICategoriesFactory[] {
    return (
      data?.map((item) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
        }
      }) || []
    )
  }
}
