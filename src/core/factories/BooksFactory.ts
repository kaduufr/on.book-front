import IBook from "@interfaces/IBook";

type DataFromApi = {
  id: number
  title: string
  author: string
  category: string
  description: string
  section: string
  quantity: number
  image: string
  available: boolean
}

export default class BooksFactory {
  static builder(data: DataFromApi[]): IBook[] {
    return data.map((book) => ({
      id: book.id,
      title: book.title,
      available: book.available ? "Disponivel no acervo" : "Indisponivel",
      image_url: book.image,
      author : book.author,
      category: book.category,
      description: book.description,
      quantity: book.quantity,
      section: book.section
     })
    )
  }
}
