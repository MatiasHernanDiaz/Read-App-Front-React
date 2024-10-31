import axios from 'axios';
import { Author } from '../model/Author';

const URL: string = "http://localhost:9000";

class AuthorService {
  async getAuthors({ name }: { name?: string }): Promise<Author[]> {
    const authorJSON$ = await axios.get(`${URL}/authors?=${name || ''}`);
    const authors = authorJSON$.data.map((authorJSON: Author) => Author.fromJSON(authorJSON));
    return authors;
  }
}

export const authorService = new AuthorService();
