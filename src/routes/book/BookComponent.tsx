import { Book } from "../../model/Book";
import { Button, List, ListItem, Card } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TranslateIcon from '@mui/icons-material/Translate'
import TitleIcon from '@mui/icons-material/Title';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import "./BookComponent.css"


const book: Book = new Book(1200, "el libro de bill", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mercadolibre.com.ar%2Fel-libro-de-bill-de-alex-hirsch-editorial-planeta-tapa-blanda%2Fp%2FMLA38346131&psig=AOvVaw2dN81UFGXdqRU55jLeH5Ka&ust=1730077753380000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjH54CwrYkDFQAAAAAdAAAAABAE", "alex hirsch", 300, new Date(1,2,2003), "español",30000,1)


//function removeBook(): void {
 //   onDeleteBook.emit(this.book)
//}

export default function BookComponent() {    


    return (
        <Card className="card">
            <div className="image-center">
                <img src={book.imageURL} alt="Portada de libro"/>
            </div>
            <div className="content">
                <div className="card-header">
                    <h2>{book.title}</h2>
                    <span>
                        <Button>
                        <DeleteOutlinedIcon />
                        </Button>
                    </span>
                </div>
                <p font-size="0.9rem">Por {book.autor} </p>
                <List className='comments'>
                    <ListItem className="comment"><AutoStoriesIcon/>{book.pages} Paginas</ListItem>
                    <ListItem className="comment"><TitleIcon/>{book.words} Palabras</ListItem>
                    <ListItem className="comment"><CalendarMonthIcon/> {book.date.toDateString()}</ListItem>
                    <ListItem className="comment"><TranslateIcon/>{book.lenguages}</ListItem>
                    <ListItem className="comment"><MonetizationOnIcon/>{book.sales} Ventas</ListItem>
                </List>
            </div>
        </Card>
    )
}