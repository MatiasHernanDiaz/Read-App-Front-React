import { Stack } from "@mui/material"
import { Book } from "../../model/Book"
import { bookService } from "../../services/bookService"
import BookComponent from "../book/BookComponent"
import './BookContainer.css'
import  AddButton from "../../components/BtnAdd/BtnAdd"


const books: Book[] = await bookService.getBooks({
    // name: text,
   })

export default function BookContainer() { 
    return(
        <Stack sx={{gap:"1rem", alignItems:"center"}}>
            {books.map((book) => (
                <BookComponent book={book}/>
            ))}
        <AddButton redirectTo="/app/authors/:id"/>
        </Stack>
    )
}