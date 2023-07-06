import IBook from "@interfaces/IBook";
import {useEffect, useState} from "react";
import BookService from "@services/BookService";
import {AxiosError} from "axios";

export function useFetchBooks() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(null);

  useEffect(() => {
    function fetchBooks() {
      setError(null)
      BookService.getBooks()
        .then(setBooks)
        .catch((err: AxiosError) => setError(err.message))
        .finally(() => setIsLoading(false))
    }

    fetchBooks();
  }, []);

  return { books, isLoading, error };
}

