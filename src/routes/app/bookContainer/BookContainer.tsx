import React from 'react';
import { Typography} from '@mui/material';
import { Stack } from "@mui/material"
import { Book } from "../../../model/Book"
import { bookService } from "../../../services/bookService"
import { msjContext } from "../MainFrame"
import BookComponent from "../../../components/book/BookComponent"
import './BookContainer.css'
import { useContext } from "react"
import { useInitialize } from '../../../hooks/useInitialize';
import AddButton from '../../../components/BtnAdd/BtnAdd';
import { AxiosError } from 'axios';
import SearchBar from '../../../components/SearchBar/searchBar';


export default function BookContainer() { 
    const {showMessage} = useContext(msjContext)
    const [books, setBooks] = React.useState<Book[]>([])

    const getBooks = async (text:string = '') =>  { 
      try{
        const books = await bookService.getBooks({
          name: text,
         })
         setBooks(books)
      }catch(e: unknown){
        showMessage((e as AxiosError<unknown>).response!)
      }
    }

    const deleteBook = async (bookId: number) => {
        try {
          const data = await bookService.deleteBook(bookId)
          showMessage(data, getBooks)
        } catch(e : unknown){
          showMessage((e as AxiosError<unknown>).response!, getBooks)
      }
    }

    useInitialize(getBooks)
    return(
        <>
        <AddButton redirectTo="/app/books/new"/>
        <SearchBar searchCallBack={getBooks}/> 
      {books.length === 0 ? (
        <Typography variant="h6" sx={{ margin: "1rem", textAlign: "center" }}>
          No hay libros disponibles</Typography>
      ) : (

        <Stack sx={{gap:"1rem", alignItems:"center"}}>
            {books.map((book) => (
                <BookComponent key={book.id} book={book} onClickAction={() => deleteBook(book.id)}/>
            ))}
        </Stack>)}
        </>
    )
}