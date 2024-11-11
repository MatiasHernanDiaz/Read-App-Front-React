import { Button, TextField, Typography, Container } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useNavigate } from "react-router-dom"

export default function AuthorEdit() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)// vulevo a atras
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault()
    // aca pongo la logica
    console.log("Datos del autor guardados")
  }

  return (
    <Container sx={{ marginTop: "2rem" }}>

      <Typography variant="h4" gutterBottom>Editar Autor</Typography>

      <form onSubmit={handleSubmit}>
        <TextField label="Nombre"variant="outlined" sx={{ marginBottom: "1rem" }}/>
        <TextField label="Apellido"variant="outlined"sx={{ marginBottom: "1rem" }}/>
        <TextField label="Idioma Nativo"variant="outlined"sx={{ marginBottom: "1rem" }}/>
         
      <Container sx={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <Button
          variant="outlined" startIcon={<ArrowBackIcon />}
          onClick={handleBack}sx={{ marginBottom: "1rem" }}
        >Volver</Button>

        <Button type="submit" variant="contained" sx={{ marginBottom: "1rem" }}>Guardar Cambios</Button>
      </Container>
      </form>
    </Container>
  )
}
