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
import { AxiosError } from "axios"

export default function Authors () {
    const navigate = useNavigate()

    const [authors, setAuthors] = useState<Author[]>([]) 
    const {showMessage} = useContext(msjContext) //para usarlo en muchos componente

    const getAuthors= async (text: string = '' ) => {
        try {
          const author= await authorService.getAuthors({
            name: text,
          })
          setAuthors(author)
        }catch(e : unknown){
          showMessage((e as AxiosError<unknown>).response!)
      }
      }
      
      const deleteAuthor = async (authorId: number) => {
        try {
          const data = await authorService.deleteAuthor(authorId)
          showMessage(data,getAuthors)
        }catch(e : unknown){
          showMessage((e as AxiosError<unknown>).response!, getAuthors)
      }
        }
        
    useInitialize(getAuthors)
  
    const goToAuthorEdit = (id:number) => {
        navigate(`/app/authors/${id}`)
      }
    
return (
    <>
    <AddButton redirectTo="/app/authors/new"/>
    <SearchBar searchCallBack={getAuthors}/>
      {authors.length === 0 ? (
        <Typography variant="h6" sx={{ margin: "1rem", textAlign: "center" }}>
          No hay autores disponibles</Typography>
      ) : (
        <List sx={{ margin: "1rem" }}>
          {authors.map((author) => (
            <Card
              key={author.id} variant="outlined"
              sx={{marginBottom: "1rem",borderRadius: "1rem",boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",borderColor: "rgba(0, 0, 0, 0.1)" }}
            >
              <CardContent sx = {{backgroundColor: '#fde7c1'}}>
                <ListItem>
                  <ListItemText
                    primary={<Typography variant="h6">{author.firstName + " " + author.lastName}</Typography>}
                    secondary={author.nativeLanguage}
                  />
                  <Button variant="outlined" color="primary" onClick={() => goToAuthorEdit(author.id)} sx={{marginRight:"0.25rem"}}>
                    <EditIcon />
                  </Button>
                  <BtnDelete
                    btnTitle="Eliminar autor" 
                    title="¿Seguro que desea eliminar este autor?"
                    description="Esta acción no se puede deshacer" 
                    setAction={() => deleteAuthor(author.id)} icon={<DeleteIcon></DeleteIcon>}
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