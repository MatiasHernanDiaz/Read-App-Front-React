import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { Stack } from "@mui/material"
import { Book } from "../../../model/Book"
import { bookService } from "../../../services/bookService"
import { msjContext } from "../MainFrame"
import BookComponent from "../../../components/book/BookComponent"
import './BookContainer.css'
import { useContext } from "react"
import { useInitialize } from '../../../hooks/useInitialize';
import AddButton from '../../../components/BtnAdd/BtnAdd';


export default function BookContainer() { 
    const {showMessage} = useContext(msjContext)
    const [books, setBooks] = React.useState<Book[]>([])
    const [open, setOpen] = React.useState(false);
    const [bookid, setBookid] = React.useState(0);

    const getBooks = async () =>  { const books = await bookService.getBooks({
        // name: text,
       })
       setBooks(books)
    }



    const handleClickOpen = (bookId: number) => {
        setBookid(bookId)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const action = () => {
        deleteBook(bookid)
        setOpen(false);
    }

    const deleteInput = {
        title: "¿Seguro que desea eliminar este libro?",
        description: "Esta acción no se puede deshacer",
    }

    const deleteBook = async (bookId: number) => {
        try {
          const data = await bookService.deleteBook(bookId)
          showMessage(data, getBooks)
        } catch (error) {
            showMessage({message:(error as {response:{data:{message:string}}})?.response.data.message, statusSeverity:'error'})
        }
    }

    useInitialize(getBooks)
    return(
        <>
        <AddButton redirectTo="/app/:books"/>
        <Stack sx={{gap:"1rem", alignItems:"center"}}>
            {books.map((book) => (
                <BookComponent book={book} onClickAction={() => handleClickOpen(book.id)}/>
            ))}
        </Stack>
        <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{deleteInput.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {deleteInput.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={action} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}