import axios from 'axios';
import { Book, BookToJSON } from '../model/Book';
import { msj } from '../routes/app/MainFrame';

const URL: string = "http://localhost:9000"
class BookService {
  async getBooks({ name }: { name?: string }): Promise<Book[]> {
    const bookJSON$ = await axios.get<BookToJSON[]>(`${URL}/books?=${name || ''}`)
    const books = bookJSON$.data.map((bookJSON: BookToJSON) => Book.fromBookJSON(bookJSON))
    return books
  }


  async deleteBook(bookId: number): Promise<msj> {
    const res = await axios.delete<msj>(`${URL}/books/${bookId}`)
    return res.data
}
}

export const bookService = new BookService()