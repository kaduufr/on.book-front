import OnBookApi from '@http/OnBookApi'
import BooksFactory, { IBookGroup } from '@factories/BooksFactory'
import ShowBooksFactory, { IShowBooksFactory } from '@factories/ShowBooksFactory'
import { BooksBorrowedFactory, IBookBorrowFactory } from '@factories/BooksBorrowedFactory'
import { AxiosResponse } from 'axios'

export type BorrowBookType = {
  user_id: number
  book_id: number
  borrow_date: Date
  due_date: Date
  quantity?: number
}

export default class BookService {
  static getBooks = (): Promise<IBookGroup[]> => {
    return OnBookApi.get('/books').then((response) => BooksFactory.builder(response.data))
  }

  static getBooksByCategory = (category: string): Promise<IShowBooksFactory> => {
    return OnBookApi.get(`/books/search?category=${category}`).then((response) =>
      ShowBooksFactory.builder(response.data)
    )
  }

  static getBook = (id: number): Promise<IBookGroup[]> => {
    return OnBookApi.get(`/books/${id}`).then((response) => {
      return BooksFactory.builder(response.data)
    })
  }

  static borrowBook = (data: BorrowBookType) => {
    return OnBookApi.post('/reservar-livro', data)
  }

  static getBooksBorrowed(): Promise<IBookBorrowFactory[]> {
    return OnBookApi.get('/livros-emprestados').then((response) =>
      BooksBorrowedFactory.builder(response.data)
    )
  }

  static getAllBooksWithoutFilter(): Promise<Pick<IShowBooksFactory, 'books' | '_meta'>> {
    return OnBookApi.get('/books/list').then((response) => ShowBooksFactory.builder(response.data))
  }

  static deleteBook(id: number): Promise<AxiosResponse> {
    return OnBookApi.delete(`/books/${id}`)
  }

  static createBook(data: FormData): Promise<AxiosResponse> {
    return OnBookApi.post('/books', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  static updateBook(id: number, data: FormData): Promise<AxiosResponse> {
    return OnBookApi.put(`/books/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
