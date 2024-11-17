import axios from 'axios';
import { Book, BookToJSON } from '../model/Book';
import { Msj } from '../routes/app/MainFrame';

const URL: string = "http://localhost:9000"
class BookService {
  async getBooks({ name }: { name?: string }): Promise<Book[]> {
    const bookJSON$ = await axios.get<BookToJSON[]>(`${URL}/books?=${name || ''}`)
    const books = bookJSON$.data.map((bookJSON: BookToJSON) => Book.fromBookJSON(bookJSON))
    return books
  }

  async deleteBook(bookId: number): Promise<Msj> {
    const res = await axios.delete<Msj>(`${URL}/books/delete/${bookId}`)
    return res.data
  }

  async addBook(book: BookToJSON): Promise<Msj> {
    const res = await axios.delete<Msj>(`${URL}/books/create/${book}`)
    return res.data
  }

}

export const bookService = new BookService()