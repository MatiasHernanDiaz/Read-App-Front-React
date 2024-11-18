import axios, { AxiosResponse } from 'axios';
import { Book, BookToJSON } from '../model/Book';

const URL: string = "http://localhost:9000"

class BookService {
  async getBooks({ name }: { name?: string }): Promise<Book[]> {
    const bookJSON$ = await axios.get<BookToJSON[]>(`${URL}/books?text=${name || ''}`)
    const books = bookJSON$.data.map((bookJSON: BookToJSON) => Book.fromBookJSON(bookJSON))
    return books
  }

  async deleteBook(bookId: number): Promise<AxiosResponse> {
    return await axios.delete<AxiosResponse>(`${URL}/books/delete/${bookId}`)
  }

  async addBook(book: BookToJSON): Promise<AxiosResponse> {
    return await axios.delete<AxiosResponse>(`${URL}/books/create/${book}`)
  }

}

export const bookService = new BookService()