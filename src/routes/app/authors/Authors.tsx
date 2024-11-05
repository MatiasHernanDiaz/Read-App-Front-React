import { Button, Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useInitialize } from "../../../hooks/useInitialize"
import { authorService } from "../../../services/authorService"
import { useState } from "react"
import { Author } from "../../../model/Author"
import EditIcon from '@mui/icons-material/Edit'
import BtnDelete from "../../../components/BtnDelete/BtnDelete"
import DeleteIcon from '@mui/icons-material/Delete'




export default function Authors () {

    const [authors, setAuthors] = useState<Author[]>([]) 
    //const [showMessage, setShowMessage] = useState<string>('');
    //const [text, setText] = useState<string>("")

    const getAuthors= async () => {
        try {
          const author= await authorService.getAuthors({
           // name: text,
          })
          setAuthors(author)
        } catch (error) {
    console.log("error",error)
        }
      }

      const deleteAuthor = async (authorId: number) => {
        try {
            await authorService.deleteAuthor(authorId)// Implementa la función de eliminación en authorService
            setAuthors(authors.filter((author) => author.id !== authorId))
        
        } catch (error) {
            console.log("Error al eliminar el autor:", error)
        
        }
    };

    useInitialize(getAuthors);

    const deleteInput = {
        btnTitle: "Eliminar autor",
        title: "¿Seguro que desea eliminar este autor?",
        description: "Esta acción no se puede deshacer",
        icon:<DeleteIcon></DeleteIcon>
    };

useInitialize(getAuthors)
    

return (
    <>
    
    <List>  {/* componente que muestra en forma vertical */}
        {authors.map((author) => (
            <Card key={author.id} variant="outlined" 
            style={{marginBottom: '1rem',
                    borderRadius:'1rem',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    borderColor: 'rgba(0, 0, 0, 0.1)'}}>
                <CardContent>
                    <ListItem> {/* en cada card alinea en forma horizontal */}
                        <ListItemText 
                        primary={<Typography variant="h6">{author.firstName + ' ' + author.lastName}</Typography>}
                        secondary={author.nativeLanguage}
                        />{/* titulo y descripcion */}
                        
                        <Button> 
                            <EditIcon/>
                        </Button>

                        <BtnDelete
                            btnTitle={deleteInput.btnTitle}
                            title={deleteInput.title}
                            description={deleteInput.description}
                            setAction={() => deleteAuthor(author.id)}
                            icon={deleteInput.icon}
                            />

                    </ListItem>
                </CardContent>
            </Card>
        ))}     
    </List> 
        </>//fragment
    
)
}