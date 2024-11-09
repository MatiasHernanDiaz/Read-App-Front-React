import { Button, Card, CardContent, InputAdornment, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { useInitialize } from "../../../hooks/useInitialize"
import { authorService } from "../../../services/authorService"
import { useState } from "react"
import { Author } from "../../../model/Author"
import EditIcon from '@mui/icons-material/Edit'
import BtnDelete from "../../../components/BtnDelete/BtnDelete"
import DeleteIcon from '@mui/icons-material/Delete'
import { Search } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';




export default function Authors () {
    const navigate = useNavigate();

    const [authors, setAuthors] = useState<Author[]>([]) 
    //const [showMessage, setShowMessage] = useState<string>('');
    const [text, setText] = useState<string>("")

    const getAuthors= async () => {
        try {
          const author= await authorService.getAuthors({
            name: text,
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
    }

    const deleteInput = {
        btnTitle: "Eliminar autor",
        title: "¿Seguro que desea eliminar este autor?",
        description: "Esta acción no se puede deshacer",
        icon:<DeleteIcon></DeleteIcon>
    };
    const handleChange = (text: string) =>{
        setText(text);
        console.log("texto",text)
    } 
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
          getAuthors();
        }
      };

      const goToAuthorEdit = (id:number) => {
          navigate(`/app/authors/edit/${id}`);
        };
useInitialize(getAuthors)
    
return (
    <>
    
<TextField
      value={text}
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={handleKeyDown}
      variant="outlined"
      sx={{display:'flex', justifyContent:'center', margin:'1rem'}}
      label="Buscar"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
      
    />
    <List sx={{margin:'1rem'}}>  {/* componente que muestra en forma vertical */}
        {authors.map((author) => (
            <Card key={author.id} variant="outlined" 
            sx={{marginBottom: '1rem',borderRadius:'1rem',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    borderColor: 'rgba(0, 0, 0, 0.1)'}}>
                <CardContent>
                    <ListItem> {/* en cada card alinea en forma horizontal */}
                        <ListItemText 
                        primary={<Typography variant="h6">{author.firstName + ' ' + author.lastName}</Typography>}
                        secondary={author.nativeLanguage}
                        />{/* titulo y descripcion */}
                            <Button 
                            onClick={()=>goToAuthorEdit(author.id)}> 
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