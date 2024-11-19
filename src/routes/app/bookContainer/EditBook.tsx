import { TextField, Button, Divider, Stack, FormControlLabel, Checkbox, Typography, Container, MenuItem, Grid2 } from "@mui/material";
import { bookService } from '../../../services/bookService';
import { Author } from '../../../model/Author';
import { authorService } from '../../../services/authorService';
import { useState, useContext, ChangeEvent } from 'react';
import { useInitialize } from '../../../hooks/useInitialize';
import { BookToJSON } from '../../../model/Book';
import { msjContext } from '../MainFrame';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { authorInit } from '../authors/AuthorEdit';
import { Language } from '../../../model/User';

const bookInit = {
    pages: 0,
    title: '',
    imageURL: '',
    autor: authorInit,
    words: 0,
    date: new Date(),
    complex: false,
    lenguages: [],
    editions: 0,
    sales: 0,
    id: -1
}

export default function BookForm() {
  const [authors, setAuthors] = useState<Author[]>([]) 
  const [book, setBook] = useState<BookToJSON>(bookInit)
  const {showMessage} = useContext(msjContext)
  const { id } = useParams() 
  const navigate = useNavigate()
  const isNew = !id
  


  async function getData() {
    console.log('var new', isNew)
    if(!isNew){
      console.log('true')
      const authorRes = authorService.getAuthors({
        name: "",
      })
      const bookRes = bookService.getBookById(+id!)
      const [authors, book] = await Promise.all([authorRes, bookRes])
      setAuthors(authors)
      setBook(book)
    }
    else{
      console.log('false')
      const authors = await authorService.getAuthors({
        name: "",
      })
      setAuthors(authors)
      setBook(bookInit)
    }
    
  }

  const validate = () => {return true}
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()//envia al back sin refrescar pagina
    if (validate()) {
      try {
        if (isNew) {
          const res = await bookService.addBook(book)
          showMessage(res)
          handleBack()
        } else {
          const res = await bookService.updateBook(book.id, book)
          showMessage(res)
          handleBack()
        }        
      }catch(e : unknown){
        showMessage((e as AxiosError<unknown>).response!, getData)
    }
    }
  }

  const handleBack = () => {
    navigate(-1) 
  }

  useInitialize(getData)
  
  return (
    
    <Stack 
        sx={{width:"90%", margin:"auto"}}>
    <form onSubmit={(e) => handleSubmit(e)}>
      <TextField
        label="Titulo"
        // {...register("title")}
        fullWidth
        margin="dense"
        value = {book.title}
        onChange={e => setBook({...book, title: ((e as ChangeEvent).target as HTMLInputElement).value})}
      />
      <TextField
      sx={{width:"100%"}}
      label = 'Autor'
      value={book.autor.id}
      onChange={e => setBook({...book, autor: authors.find(aut => aut.id === +((e as ChangeEvent).target as HTMLInputElement).value)!})}
      select
      >
        {authors.map((auth) => (
          <MenuItem value={auth.id}>{auth.lastName + " " + auth.firstName}</MenuItem>
        ))}
        
      </TextField>

      <Divider sx={{ margin: '0.5rem 0', backgroundColor:"black"}} />

      <TextField
        label="Ediciones"
        value={ book.editions}
        fullWidth
        margin="dense"
        onChange={e => setBook({...book, editions: +((e as ChangeEvent).target as HTMLInputElement).value})}

      />
      <Stack display="flex" flexDirection="row" gap={2} >
        <TextField
          label="Cantidad de páginas"
          fullWidth
          margin="dense"
          value={book.pages}
          onChange={e => setBook({...book, pages: +((e as ChangeEvent).target as HTMLInputElement).value})}
        />

        <TextField
          label="Cantidad de palabras"
          fullWidth
          margin="dense"
          value={book.words}
          onChange={e => setBook({...book, words: +((e as ChangeEvent).target as HTMLInputElement).value})}
        />

      </Stack>

      <TextField
          label="Ventas semanales"
          fullWidth
          margin="dense"
          value={book.sales}
          onChange={e => setBook({...book, sales: +((e as ChangeEvent).target as HTMLInputElement).value})}
        />

      <FormControlLabel 
      control={<Checkbox 
        checked={book.complex} 
        onChange={e => setBook({...book, complex: ((e as ChangeEvent).target as HTMLInputElement).checked})}
            />} 
      label="Lectura compleja" />
    
    <Divider sx={{ margin: '0.5rem 0', backgroundColor:"black"}} />

    <Typography variant="body2"  sx={{ fontWeight: 'bold' }}>Lenguaje Original</Typography>
    <Typography variant="body2"  sx={{ fontWeight: 'bold' }}>Otros Idiomas</Typography>

      <Grid2 >
        {
          Object.entries(Language).map(
            ([key, val]) => <FormControlLabel
                              control={<Checkbox 
                                checked={book.lenguages.includes(key)}
                                value={key} 
                                onChange={e => setBook({...book, lenguages: 
                                  ((e as ChangeEvent).target as HTMLInputElement).checked ? 
                                    [...book.lenguages, key] : book.lenguages.filter(lan => lan !== key)
                                })}
                                    />} 
                              label={val} />                
          )
        }
      </Grid2>

      <Container sx={{ marginTop: "2rem", display: "flex",justifyContent: "space-between" }}>
        <Button
          variant="outlined" sx={{ marginBottom: "1rem" }}
          onClick={handleBack}
        >Volver</Button>

        <Button type="submit" variant="contained" sx={{ marginBottom: "1rem" }}>Guardar Cambios</Button>
      </Container>
    </form>
    </Stack>
  )
}
