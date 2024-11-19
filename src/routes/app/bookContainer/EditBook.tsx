import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Button, Divider, Stack, FormControlLabel, Checkbox, Typography, Grid, Container, MenuItem } from "@mui/material";
import { bookService } from '../../../services/bookService';
import { Author } from '../../../model/Author';
import { authorService } from '../../../services/authorService';
import { useState, useContext } from 'react';
import { useInitialize } from '../../../hooks/useInitialize';
import { BookToJSON,Book } from '../../../model/Book';
import { msjContext } from '../MainFrame';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  title: string
  authorId: number
  editions: number
  cantPag: number
  cantPal: number
  ventas: number
  complexReading: boolean
  lenguage: boolean[]
}

export default function BookForm({newBook}:{newBook:boolean}) {
  const [authors, setAuthors] = useState<Author[]>([]) 
  const {showMessage} = useContext(msjContext)
  const navigate = useNavigate()


  async function getAuthors() {
    const author= await authorService.getAuthors({
      name: "",
    })
    setAuthors(author)
  }

  const addBook = async (book: BookToJSON) => {
    try {
      const data = await bookService.addBook(book)
      showMessage(data)
    } catch (error) {
        showMessage({message:(error as {response:{data:{message:string}}})?.response.data.message, statusSeverity:'error'})
    }
}

  const { register,control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      lenguage: Array(9).fill(false) // marco los 9 checkboxes como desmarcados
    }
  })
  const onSubmit: SubmitHandler<FormValues> = async data => {
    console.log(data);
    addBook(new Book(
      data.cantPag,
      data.title,
      "data.imageURL",
      await authorService.getAuthorById(data.authorId),
      data.cantPal,
      new Date(),
      data.complexReading,
      [],
      data.editions,
      data.ventas,
      1000).bookToJSON())
  }

  const handleBack = () => {
    navigate(-1) 
  }
  const labels = ["Español", "Inglés", "Francés", "Alemán", "Arabe", "Portugués", "Bengali", "Hindi", "Mandarin"]
  useInitialize(getAuthors)
  return (
    
    <Stack 
        sx={{width:"90%", margin:"auto"}}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Titulo"
        {...register("title")}
        fullWidth
        margin="dense"
      />
      <TextField
      sx={{width:"100%"}}
      label = 'Autor'
      select
      {...register("authorId")}>
        {authors.map((auth) => (
          <MenuItem value={auth.id}>{auth.lastName + " " + auth.firstName}</MenuItem>
        ))}

      </TextField>
      
      <Divider sx={{ margin: '0.5rem 0', backgroundColor:"black"}} />

      <TextField
        label="Ediciones"
        inputProps={{ type: 'number'}}
        {...register("editions")}
        fullWidth
        margin="dense"
      />
      <Stack display="flex" flexDirection="row" gap={2} >
        <TextField
          label="Cantidad de páginas"
          inputProps={{ type: 'number'}}
          {...register("cantPag")}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Cantidad de palabras"
          inputProps={{ type: 'number'}}
          {...register("cantPal")}
          fullWidth
          margin="dense"
        />
      </Stack>
      <TextField
          label="Ventas semanales"
          inputProps={{ type: 'number'}}
          {...register("ventas")}
          fullWidth
          margin="dense"
        />

      {/* Checkbox */}
    <FormControlLabel
        control={<Checkbox {...register("complexReading")} />}
        label="Lectura compleja"
    />

    <Divider sx={{ margin: '0.5rem 0', backgroundColor:"black"}} />

    <Typography variant="body2"  sx={{ fontWeight: 'bold' }}>Lenguaje Original</Typography>
    <Typography variant="body2"  sx={{ fontWeight: 'bold' }}>Otros Idiomas</Typography>


      <Grid container spacing={2}>
        {labels.map((labels, index) => (
          <Grid item xs={4} key={index}>
            <Controller
              name={`lenguage.${index}`}
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={labels}
                />
              )}
            />
          </Grid>
        ))}
      </Grid>
      

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
