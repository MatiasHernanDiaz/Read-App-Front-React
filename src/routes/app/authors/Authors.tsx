import { Button, Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material"
import { useInitialize } from "../../../hooks/useInitialize"
import { authorService } from "../../../services/authorService"
import { useContext, useState } from "react"
import { Author } from "../../../model/Author"
import EditIcon from '@mui/icons-material/Edit'
import BtnDelete from "../../../components/BtnDelete/BtnDelete"
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import { msjContext } from "../MainFrame"
import  AddButton from "../../../components/BtnAdd/BtnAdd"
import SearchBar from "../../../components/SearchBar/searchBar"



export default function Authors () {
    const navigate = useNavigate()

    const [authors, setAuthors] = useState<Author[]>([]) 
    const [text, setText] = useState<string>("")
    const {showMessage} = useContext(msjContext)

    const getAuthors= async () => {
        try {
          const author= await authorService.getAuthors({
            name: text,
          })
          setAuthors(author)
        } catch (error) {
            showMessage({message:(error as Error).message, statusSeverity:'error'})
        }
      }
      
      const deleteAuthor = async (authorId: number) => {
        try {
          const data = await authorService.deleteAuthor(authorId)// Implementa la función de eliminación en authorService
          showMessage(data,getAuthors)
        } catch (error) {
            showMessage({message:(error as {response:{data:{message:string}}})?.response.data.message, statusSeverity:'error'})
        }
    }

    const deleteInput = {
        btnTitle: "Eliminar autor",
        title: "¿Seguro que desea eliminar este autor?",
        description: "Esta acción no se puede deshacer",
        icon:<DeleteIcon></DeleteIcon>
    }
    const handleChange = (text: string) =>{
        setText(text)
    } 
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key == "Enter") {
          getAuthors()
        }
      }
    const handleSearchClick = () => {
        getAuthors()
    }
      const goToAuthorEdit = (id:number) => {
          navigate(`/app/authors/${id}`)
        }
useInitialize(getAuthors)
    
return (
    <>
    <AddButton redirectTo="/app/authors/new"/>
    <Typography variant="h4" sx={{margin: '1rem'}}>Autores</Typography>
    <SearchBar
      value={text} onChange={(e) => handleChange(e.target.value)} onKeyDown={handleKeyDown} onSearchClick={handleSearchClick}
    />
          
      {/* Verifica si el array authors está vacío */}
      {authors.length === 0 ? (
        <Typography variant="h6" sx={{ margin: "1rem", textAlign: "center" }}>
          No hay autores disponibles</Typography>
      ) : (
        <List sx={{ margin: "1rem" }}>
          {authors.map((author) => (
            <Card
              key={author.id} variant="outlined"
              sx={{marginBottom: "1rem",borderRadius: "1rem",boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                borderColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <ListItem>
                  <ListItemText
                    primary={<Typography variant="h6">{author.firstName + " " + author.lastName}</Typography>}
                    secondary={author.nativeLanguage}
                  />
                  <Button onClick={() => goToAuthorEdit(author.id)}>
                    <EditIcon />
                  </Button>

                  <BtnDelete
                    btnTitle={deleteInput.btnTitle} title={deleteInput.title}
                    description={deleteInput.description} setAction={() => deleteAuthor(author.id)}
                    icon={deleteInput.icon}
                  />
                </ListItem>
              </CardContent>
            </Card>
          ))}
        </List>
      )}
    </> 
  )
}