import OnBookApi from "@http/OnBookApi";
import IBook from "@interfaces/IBook";
import BooksFactory from "@factories/BooksFactory";

export default class BookService {
  static getBooks = (): Promise<IBook[]> => {
    return OnBookApi.get("/books")
      .then((response) => BooksFactory.builder(response.data))
  }
}
