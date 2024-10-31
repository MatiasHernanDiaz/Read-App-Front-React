import { Card, CardContent, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useInitialize } from "../../../hooks/useInitialize"
import { authorService } from "../../../service/authorService"
import { useState } from "react"
import { Author } from "../../../model/Author"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'


export default function Authors () {

    const [authors, setAuthors] = useState<Author[]>([]) 
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

useInitialize(getAuthors)
    

return (
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
                        <IconButton>
                            <EditIcon/>
                        </IconButton>

                        <IconButton>
                            <DeleteIcon/>
                        </IconButton>

                    </ListItem>
                </CardContent>
            </Card>

        ))}
    </List>  
)
}