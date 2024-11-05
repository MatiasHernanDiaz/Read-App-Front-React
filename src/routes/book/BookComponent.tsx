import { Book } from "../../model/Book";
import { IconButton, List, ListItem, Card } from '@mui/material';
import { bookService } from "../../services/bookService"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TranslateIcon from '@mui/icons-material/Translate'
import TitleIcon from '@mui/icons-material/Title';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EditIcon from '@mui/icons-material/Edit';
import "./BookComponent.css"


function removeBook(book:Book): void {
    bookService.deleteBook(book.id)
}

export default function BookComponent({book}:{book:Book}) {    


    return (
        <Card className="card">
            <div>
                <img src={book.imageURL} className="img" alt="Portada de libro"/>
            </div>
            <div className="content">
                <div className="card-header">
                    <h2>{book.title}</h2>
                    <List sx={{display: "flex", width: "30%"}}>
                        <IconButton size="small" color="primary">
                        <EditIcon/>
                        </IconButton>

                        <IconButton size="small" color="primary">
                        <DeleteOutlinedIcon/>
                        </IconButton>
                    </List>
                </div>
                <p font-size="0.9rem">Por {book.autor} </p>
                <List className='comments'>
                    <ListItem className="comment"><AutoStoriesIcon/>{book.pages} Paginas</ListItem>
                    <ListItem className="comment"><TitleIcon/>{book.words} Palabras</ListItem>
                    <ListItem className="comment"><CalendarMonthIcon/> {"dd/mm/aaa"/*book.date.toString()*/}</ListItem>
                    <ListItem className="comment"><TranslateIcon/>{book.lenguages}</ListItem>
                    <ListItem className="comment"><MonetizationOnIcon/>{book.sales} Ventas</ListItem>
                </List>
            </div>
        </Card>
    )
}