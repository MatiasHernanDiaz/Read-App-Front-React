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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import './BookContainer.css';


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
  const [errors, setErrors] = useState<{ title: string; pages: string; authorId: string; words: string; editions: string; sales: string; lenguages: string }>({
    title: "",
    pages: "",
    authorId: "",
    words: "",
    editions: "",
    sales: "",
    lenguages: ""
  })


  async function getData() {
    if(!isNew){
      const authorRes = authorService.getAuthors({
        name: "",
      })
      const bookRes = bookService.getBookById(+id!)
      const [authors, book] = await Promise.all([authorRes, bookRes])
      setAuthors(authors)
      setBook(book)
    }
    else{
      const authors = await authorService.getAuthors({
        name: "",
      })
      setAuthors(authors)
      setBook(bookInit)
    }
    
  }
  
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

  function valNum(i: number): string{
    if (i > 0){
      return "true"
    }
    else return ""
  }

  const validate = () => {
    const newErrors = {
      title: book.title ? "" : "Complete el campo",
      pages: valNum(book.pages) ? "" : "Complete el campo",
      authorId: book.autor.lastName ? "" : "Complete el campo",
      words: valNum(book.words) ? "" : "Complete el campo",
      editions: valNum(book.editions) ? "" : "Complete el campo",
      sales: valNum(book.sales) ? "" : "Complete el campo",
      lenguages: book.lenguages.toString() ? "" : "Complete el campo"
    }
    setErrors(newErrors)
    return newErrors.title === "" && newErrors.pages === "" && newErrors.authorId === "" && newErrors.words === "" && newErrors.editions === "" && newErrors.sales === ""
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
        error={!!errors.title}
        helperText={errors.title}
    
      />
      <TextField
      sx={{width:"100%"}}
      label = 'Autor'
      value={book.autor.id}
      margin="dense"
      onChange={e => {
        const autor = authors.find(aut => aut.id === +((e as ChangeEvent).target as HTMLInputElement).value)! 
        setBook({
          ...book, 
            autor,
            lenguages: [autor.nativeLanguage]
          })
      }}
      error={!!errors.authorId}
      helperText={errors.authorId}
      select
      >
        {authors.map((auth) => (
          <MenuItem key={ auth.id } value={auth.id}>{auth.lastName + " " + auth.firstName}</MenuItem>
        ))}
        
      </TextField>

      <Divider sx={{ margin: '0.5rem 0', backgroundColor:"black"}} />

      <TextField
        label="Ediciones"
        value={ book.editions}
        fullWidth
        margin="dense"
        onChange={e => 
          /^[0-9]*$/.test(((e as ChangeEvent).target as HTMLInputElement).value) && 
          setBook({...book, editions:  +((e as ChangeEvent).target as HTMLInputElement).value })}
        error={!!errors.editions}
        helperText={errors.editions}
      />
      <Stack display="flex" flexDirection="row" gap={2} >
        <TextField
          label="Cantidad de páginas"
          fullWidth
          margin="dense"
          value={book.pages}
          onChange={e => /^[0-9]*$/.test(((e as ChangeEvent).target as HTMLInputElement).value) && 
          setBook({...book, pages:  +((e as ChangeEvent).target as HTMLInputElement).value })}
          error={!!errors.pages}
          helperText={errors.pages}
        />

        <TextField
          label="Cantidad de palabras"
          fullWidth
          margin="dense"
          value={book.words}
          onChange={e => /^[0-9]*$/.test(((e as ChangeEvent).target as HTMLInputElement).value) && 
          setBook({...book, words:  +((e as ChangeEvent).target as HTMLInputElement).value })}
          error={!!errors.words}
          helperText={errors.words}
        />

      </Stack>

      <TextField
          label="Ventas semanales"
          fullWidth
          margin="dense"
          value={book.sales}
          onChange={e => /^[0-9]*$/.test(((e as ChangeEvent).target as HTMLInputElement).value) && 
          setBook({...book, sales:  +((e as ChangeEvent).target as HTMLInputElement).value })}
          error={!!errors.sales}
          helperText={errors.sales}
        />

      <FormControlLabel 
      control={<Checkbox 
        checked={book.complex} 
        onChange={e => setBook({...book, complex: ((e as ChangeEvent).target as HTMLInputElement).checked})}   
        sx={{
          color: '#F25D0B', // Color del checkbox sin marcar
          '&.Mui-checked': {
            color: '#F25D0B', // Color del checkbox marcado
          },
        }}/>} 
      label="Lectura compleja" />
    
    <Divider sx={{ margin: '0.5rem 0', backgroundColor:"black"}} />

    <Typography variant="body2"  sx={{ fontWeight: 'bold' }}>Lenguaje Original</Typography>
    <Typography variant="body2"  sx={{ fontWeight: 'bold' }}>Otros Idiomas</Typography>

      <Grid2 >
        {
          Object.entries(Language).map(
            ([key, val]) => <FormControlLabel
                              key={ key }
                              control={<Checkbox 
                                checked={book.lenguages.includes(key)}
                                value={key} 
                                onChange={e => setBook({...book, lenguages: 
                                  ((e as ChangeEvent).target as HTMLInputElement).checked ? 
                                    [...book.lenguages, key] : book.lenguages.filter(lan => lan !== key)
                                })}
                                sx={{
                                  color: '#F25D0B', // Color del checkbox sin marcar
                                  '&.Mui-checked': {
                                    color: '#F25D0B', // Color del checkbox marcado
                                  },
                                }}    
                                    />} 
                              label={val} />                
          )
        }
      </Grid2>

      <Container sx={{ marginTop: "2rem", display: "flex",justifyContent: "space-between" }}>
          <Button
              variant="outlined" startIcon={<ArrowBackIcon />}
              onClick={handleBack} sx={{ marginBottom: "1rem",backgroundColor:'#aaa',color:'white', borderColor:'#aaa'}}
            >Volver</Button>

        <Button type="submit" variant="contained" sx={{ marginBottom: "1rem",backgroundColor:'#F25D0B' }}>Guardar Cambios</Button>
      </Container>
    </form>
    </Stack>
  )
}
