import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Button, Divider, Stack, FormControlLabel, Checkbox, Typography, Grid, Container } from "@mui/material";

type FormValues = {
  title: string
  author: string
  editions: string
  cantPag: string
  cantPal: string
  ventas: string
  complexReading: boolean
  lenguage: boolean[]
}

export default function BookForm() {

  const { register,control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      lenguage: Array(9).fill(false) // marco los 9 checkboxes como desmarcados
    }
  })
  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
  }

  const labels = ["Español", "Inglés", "Francés", "Alemán", "Arabe", "Portugués", "Bengali", "Hindi", "Mandarin"]
  return (
    
    <Stack 
        sx={{width:"90%", margin:"auto"}}>
    <Typography variant="h4" >Libros</Typography>
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Titulo"
        {...register("title")}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Autor"
        {...register("author")}
        fullWidth
        margin="dense"
      />
      
      <Divider sx={{ margin: '0.5rem 0', backgroundColor:"black"}} />

      <TextField
        label="Ediciones"
        {...register("editions")}
        fullWidth
        margin="dense"
      />
      <Stack display="flex" flexDirection="row" gap={2} >
        <TextField
          label="Cantidad de páginas"
          {...register("cantPag")}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Cantidad de palabras"
          {...register("cantPal")}
          fullWidth
          margin="dense"
        />
      </Stack>
      <TextField
          label="Ventas semanales"
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
        >Volver</Button>

        <Button type="submit" variant="contained" sx={{ marginBottom: "1rem" }}>Guardar Cambios</Button>
      </Container>
    </form>
    </Stack>
  )
}
