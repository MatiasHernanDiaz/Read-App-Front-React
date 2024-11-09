import axios from 'axios';
import { Author } from '../model/Author';

const URL: string = "http://localhost:9000"
class AuthorService {
  async getAuthors({ name }: { name?: string }): Promise<Author[]> {
    const authorJSON$ = await axios.get<Author[]>(`${URL}/authors?text=${name || ''}`)
    const authors = authorJSON$.data.map((authorJSON: Author) => Author.fromJSON(authorJSON))
    return authors
  }

  async deleteAuthor(authorId: number): Promise<void> {
      await axios.delete(`${URL}/authors/${authorId}`)
  }
  async getAuthorById(id: number): Promise<Author> {
    const authorJSON$ = await axios.get<Author>(`${URL}/authors/${id}`)
    return Author.fromJSON(authorJSON$.data)
  }
  async updateAuthor(id: number, updatedAuthor: Author): Promise<Author> {
    const authorJSON$ = await axios.put<Author>(`${URL}/authors/${id}`, updatedAuthor)
    return Author.fromJSON(authorJSON$.data)
  }

}

export const authorService = new AuthorService()
