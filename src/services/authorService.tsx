import axios from 'axios'
import { Author } from '../model/Author'
import { Msj } from '../routes/app/MainFrame'
import { Language } from '../model/User';

const URL: string = "http://localhost:9000"


interface AuthorNew {
  id: number;
  firstName: string;
  lastName: string;
  nativeLanguage: Language;
}
class AuthorService {
  async getAuthors({ name }: { name?: string }): Promise<Author[]> {
    const authorJSON$ = await axios.get<Author[]>(`${URL}/authors?text=${name || ''}`)
    const authors = authorJSON$.data.map((authorJSON: Author) => Author.fromJSON(authorJSON))
    return authors
  }

  async deleteAuthor(authorId: number): Promise<Msj> {
      const res = await axios.delete<Msj>(`${URL}/authors/${authorId}`)
      return res.data
  }
  async getAuthorById(id: number): Promise<Author> {
    const authorJSON$ = await axios.get<Author>(`${URL}/authors/${id}`)
    return Author.fromJSON(authorJSON$.data)
  }
  async updateAuthor(id: number, updatedAuthor: Author): Promise<Author> {
    const authorJSON$ = await axios.put<Author>(`${URL}/authors/${id}`, updatedAuthor)
    return Author.fromJSON(authorJSON$.data)
  }
  async createAuthor(newAuthor: Author) {
    const response = await axios.post<AuthorNew>(`${URL}/authors/new`, newAuthor);
    return response.data;  
  }

}

export const authorService = new AuthorService()
