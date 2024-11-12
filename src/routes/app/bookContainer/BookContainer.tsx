import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { Stack } from "@mui/material"
import { Book } from "../../../model/Book"
import { bookService } from "../../../services/bookService"
import { msjContext } from "../MainFrame"
import BookComponent from "../../../components/book/BookComponent"
import './BookContainer.css'
import { useContext } from "react"

const books: Book[] = await bookService.getBooks({
    // name: text,
   })

export default function BookContainer() { 
    const {showMessage} = useContext(msjContext)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const action = (bookId: number) => {
        deleteBook(bookId)
        setOpen(false);
    }

    const deleteInput = {
        title: "¿Seguro que desea eliminar este libro?",
        description: "Esta acción no se puede deshacer",
    }

    const deleteBook = async (bookId: number) => {
        try {
          const data = await bookService.deleteBook(bookId)// Implementa la función de eliminación en authorService
          showMessage(data)
        } catch (error) {
            showMessage({message:(error as {response:{data:{message:string}}})?.response.data.message, statusSeverity:'error'})
        }
    }

    return(
        <>
        <Stack sx={{gap:"1rem", alignItems:"center"}}>
            {books.map((book) => (
                <BookComponent book={book} onClickAction={handleClickOpen} /*deleteBook={deleteBook(book.id)}*//>
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