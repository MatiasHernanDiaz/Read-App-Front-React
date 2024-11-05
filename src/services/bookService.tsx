import axios from 'axios';
import { Book } from '../model/Book';

const URL: string = "http://localhost:9000"
class BookService {
  async getBooks({ name }: { name?: string }): Promise<Book[]> {
    const bookJSON$ = await axios.get<Book[]>(`${URL}/books?=${name || ''}`)
    const books = bookJSON$.data.map((bookJSON: Book) => Book.fromBookJSON(bookJSON))
    return books
  }

  /*async deleteBook(bookId: number): Promise<void> {
      await axios.delete(`${URL}/books/${bookId}`)
  }*/
}

export const bookService = new BookService()