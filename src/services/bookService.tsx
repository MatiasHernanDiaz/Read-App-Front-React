import axios, { AxiosResponse } from 'axios';
import { Book, BookToJSON } from '../model/Book';

const URL: string = "http://localhost:9000"

class BookService {
  async getBooks({ name }: { name?: string }): Promise<Book[]> {
    const bookJSON$ = await axios.get<BookToJSON[]>(`${URL}/books?text=${name || ''}`)
    const books = bookJSON$.data.map((bookJSON: BookToJSON) => Book.fromBookJSON(bookJSON))
    return books
  }

  async getBookById(id: number): Promise<Book> {
    const bookJSON$ = await axios.get<BookToJSON>(`${URL}/books/${id}`)
    return Book.fromBookJSON(bookJSON$.data)
  }

  async deleteBook(bookId: number): Promise<AxiosResponse> {
    return await axios.delete<AxiosResponse>(`${URL}/books/delete/${bookId}`)
  }

  async addBook(book: BookToJSON): Promise<AxiosResponse> {
    return await axios.post<AxiosResponse>(`${URL}/books/create`, book)
  }

  async updateBook(id: number, updatedBook: BookToJSON): Promise<AxiosResponse> {
    return await axios.put<AxiosResponse>(`${URL}/books/update/${id}`, updatedBook)
  }
}

export const bookService = new BookService()