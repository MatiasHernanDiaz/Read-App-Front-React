import { Book } from "../../model/Book";
import { List, ListItem, Card, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TranslateIcon from '@mui/icons-material/Translate'
import TitleIcon from '@mui/icons-material/Title';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EditIcon from '@mui/icons-material/Edit';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import "./BookComponent.css"
import BtnDelete from "../BtnDelete/BtnDelete";
import { useNavigate } from "react-router-dom";


export default function BookComponent({book,onClickAction}:CustomIndicatorPayload) {    

    const navigate = useNavigate()

    function complex(){
        if (book.complex){
            return "compleja"
        }
        else return "sencilla"
    }

    function listToString(strings : string[]){
        let result: string = ""
        for(let i = 0; i < Math.min(2,strings.length); i++){
            result = result + " " + strings[i]
            if(i === 1 && strings.length>2){
                result += ` +${strings.length - i - 1}`                
            }
        }
        return result
    }

    const goToEditBook = (id: number) => {
        navigate(`/app/books/${id}`)
    }

    return (
        <Card className="card">
            <div className="image-center">
                <img src={book.imageURL} className="img" alt="Portada de libro"/>
            </div>
            <div>
                <div className="card-header">
                    <h2 className="title">{book.title}</h2>
                    <IconButton color="primary" /*onClick={handleClickOpen}*/>
                        <WorkspacePremiumIcon/>
                    </IconButton>
                </div>
                <div className="card-header">
                    <p className="author">Por {book.autor.firstName + " " + book.autor.lastName} </p>
                    <List sx={{display: "flex", width: "50%", padding:"0.1rem"}}>
                            <Button variant="outlined" color="primary" onClick={() => goToEditBook(book.id)} sx={{marginRight:"0.25rem"}}>
                                <EditIcon/>
                            </Button>
                            <BtnDelete
                                btnTitle="Eliminar autor" title="¿Seguro que desea eliminar este autor?"
                                description="Esta acción no se puede deshacer" setAction={() => onClickAction(book.id)}
                                icon={<DeleteIcon></DeleteIcon>}
                            />
                    </List>
                </div>
                <List className='comments'>
                    <ListItem className="comment"><AutoStoriesIcon sx={{marginRight:"0.5rem"}}/>{book.pages} Paginas</ListItem>
                    <ListItem className="comment"><TitleIcon sx={{marginRight:"0.5rem"}}/>{book.words} Palabras</ListItem>
                    <ListItem className="comment"><CalendarMonthIcon sx={{marginRight:"0.5rem"}}/> {"mm/dd/aaaa"}</ListItem>
                    <ListItem className="comment"><MonetizationOnIcon sx={{marginRight:"0.5rem"}}/>{book.sales} Ventas</ListItem>
                    <ListItem className="comment"><AutorenewIcon sx={{marginRight:"0.5rem"}}/>{book.editions} Ediciones</ListItem>
                    <ListItem className="comment" sx={{fontSize:"0.8rem", marginTop:1}}><TranslateIcon sx={{marginRight:"0.5rem"}}/>{listToString(book.lenguages)}</ListItem>
                    <ListItem className="comment"><PsychologyAltIcon sx={{marginRight:"0.5rem"}}/>Lectura {complex()}</ListItem>
                </List>
            </div>
        </Card>
    )
}

export type CustomIndicatorPayload = {
    book: Book,
    onClickAction: (bookId: number) => Promise<void>
}