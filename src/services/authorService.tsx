import axios, { AxiosResponse } from 'axios'
import { Author } from '../model/Author'

const URL: string = "http://localhost:9000"

class AuthorService {
  async getAuthors({ name }: { name?: string }): Promise<Author[]> {
    const authorJSON$ = await axios.get<Author[]>(`${URL}/authors?text=${name || ''}`)
    const authors = authorJSON$.data.map((authorJSON: Author) => Author.fromJSON(authorJSON))
    return authors
  }

  async deleteAuthor(authorId: number): Promise<AxiosResponse> {
      return await axios.delete<AxiosResponse>(`${URL}/authors/${authorId}`)
  }
  async getAuthorById(id: number): Promise<Author> {
    const authorJSON$ = await axios.get<Author>(`${URL}/authors/${id}`)
    return Author.fromJSON(authorJSON$.data)
  }
  
  async updateAuthor(id: number, updatedAuthor: Author): Promise<AxiosResponse> {
    return await axios.put<AxiosResponse>(`${URL}/authors/${id}`, updatedAuthor)
  }
  async createAuthor(newAuthor: Author) {
    return await axios.post<AxiosResponse>(`${URL}/authors/new`, newAuthor)
  }

}

export const authorService = new AuthorService()
