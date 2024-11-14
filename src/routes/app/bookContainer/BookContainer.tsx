import React, { useState } from 'react';
import {InputAdornment, TextField} from '@mui/material';
import { Stack } from "@mui/material"
import { Book } from "../../../model/Book"
import { bookService } from "../../../services/bookService"
import { msjContext } from "../MainFrame"
import BookComponent from "../../../components/book/BookComponent"
import './BookContainer.css'
import { useContext } from "react"
import { useInitialize } from '../../../hooks/useInitialize';
import AddButton from '../../../components/BtnAdd/BtnAdd';
import { Search } from '@mui/icons-material';


export default function BookContainer() { 
    const {showMessage} = useContext(msjContext)
    const [books, setBooks] = React.useState<Book[]>([])
    const [text, setText] = useState<string>("")

    const getBooks = async () =>  { const books = await bookService.getBooks({
        name: text,
       })
       setBooks(books)
    }

    const deleteBook = async (bookId: number) => {
        try {
          const data = await bookService.deleteBook(bookId)
          showMessage(data, getBooks)
        } catch (error) {
            showMessage({message:(error as {response:{data:{message:string}}})?.response.data.message, statusSeverity:'error'})
        }
    }

    const handleChange = (text: string) =>{
        setText(text)
    } 
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key == "Enter") {
          getBooks()
        }
      }
    useInitialize(getBooks)
    return(
        <>
        <AddButton redirectTo="/app/books/new"/>

        <TextField
      value={text} onChange={(e) => handleChange(e.target.value)} onKeyDown={handleKeyDown}
      variant="outlined" sx={{display:'flex', justifyContent:'center', margin:'1rem'}}label="Buscar"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search/>
          </InputAdornment>
        ),
      }} ></TextField>

        <Stack sx={{gap:"1rem", alignItems:"center"}}>
            {books.map((book) => (
                <BookComponent key={book.id} book={book} onClickAction={() => deleteBook(book.id)}/>
            ))}
        </Stack>
        </>
    )
}