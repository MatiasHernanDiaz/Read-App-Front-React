import { Card, CardContent } from "@mui/material";
import { useInitialize } from "../../../hooks/useInitialize"
import { authorService } from "../../../service/authorService"
import { useState } from "react"
import { Author } from "../../../model/Author"


export default function Authors () {

    const [authors, setAuthors] = useState<Author[]>([]) 
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

useInitialize(getAuthors)
    

return (
    <CardContent>
            {authors.map((author) => 
                <Card key={author.id}>{author.firstName}</Card>
            )}
    </CardContent>

    
)

}


