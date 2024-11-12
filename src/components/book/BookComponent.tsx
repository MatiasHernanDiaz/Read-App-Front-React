import { Book } from "../../model/Book";
import { IconButton, List, ListItem, Card } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TranslateIcon from '@mui/icons-material/Translate'
import TitleIcon from '@mui/icons-material/Title';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EditIcon from '@mui/icons-material/Edit';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import "./BookComponent.css"


export default function BookComponent({book,onClickAction}:CustomIndicatorPayload) {    


    function listToString(strings : string[]){
        var result: string = ""
        strings.map(word => {
            result = result + " " + word
        })
        return result
    }

    return (
        <Card className="card">
            <div>
                <img src={book.imageURL} className="img" alt="Portada de libro"/>
            </div>
            <div className="content">
                <div className="card-header">
                    <h2 className="title">{book.title}</h2>
                    <List sx={{display: "flex", width: "30%"}}>
                        <IconButton size="small" color="primary">
                        <EditIcon/>
                        </IconButton>

                        <IconButton size="small" color="primary" onClick={() => onClickAction(book.id)}>
                        <DeleteOutlinedIcon/>
                        </IconButton>
                    </List>
                </div>
                <p className="author">Por {book.autor.firstName + " " + book.autor.lastName} </p>
                <List className='comments'>
                    <ListItem className="comment"><AutoStoriesIcon/>{book.pages} Paginas</ListItem>
                    <ListItem className="comment"><TitleIcon/>{book.words} Palabras</ListItem>
                    <ListItem className="comment"><CalendarMonthIcon/> {"mm/dd/aaaa"}</ListItem>
                    <ListItem className="comment"><MonetizationOnIcon/>{book.sales} Ventas</ListItem>
                    <ListItem className="comment"><AutorenewIcon/>{book.editions} Ediciones</ListItem>
                    <ListItem className="comment" sx={{fontSize:"0.65rem"}}><TranslateIcon/>{listToString(book.lenguages)}</ListItem>
                </List>
            </div>
        </Card>
    )
}

export type CustomIndicatorPayload = {
    book: Book,
    onClickAction: (bookid: number) => void
}