import { Button, TextField, Typography, Container, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useNavigate, useParams } from "react-router-dom"
import { authorService } from "../../../services/authorService"
import { Author, Language } from "../../../model/Author"
import { useContext, useEffect, useState } from "react"
import { msjContext } from "../MainFrame"
import { useInitialize } from "../../../hooks/useInitialize"


export default function AuthorEdit() {
  const { showMessage } = useContext(msjContext)
  const navigate = useNavigate()
  const { id } = useParams() 
  const authorId = parseInt(id || "0", 10)
  const isNew = !id;

  const [author, setAuthor] = useState<Author>({
    firstName: "",
    lastName: "",
    nativeLanguage: Language.SPANISH
  })

  const [errors, setErrors] = useState<{ firstName: string; lastName: string }>({
    firstName: "",
    lastName: "",
  });
  
  useEffect(() => {
    if (!isNew) {
      const fetchAuthor = async () => {
        try {
          const authorData = await authorService.getAuthorById(authorId)
          setAuthor(authorData)
        } catch (error) {
          showMessage({ message: (error as Error).message, statusSeverity: "error" })
        }
      };
      fetchAuthor()
    }
  }, [isNew, authorId, showMessage])
  

  const handleBack = () => {
    navigate(-1) 
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validate()) {
      try {
        if (isNew) {
          const newAuthor = await authorService.createAuthor(author)
          setAuthor(newAuthor)
        } else {
          const updatedAuthor = await authorService.updateAuthor(authorId, author)
          setAuthor(updatedAuthor)
        }
        showMessage({ message: isNew ? "Autor creado" : "Autor actualizado", statusSeverity: "success" })
        navigate(-1)
      } catch (error) {
        showMessage({ message: (error as Error).message, statusSeverity: "error" })
      }
    }
  }

  // const getAuthor = async () => {
  //   try {
  //     const authorData = await authorService.getAuthorById(authorId)
  //     setAuthor(authorData)
  //   } catch (error) {
  //     showMessage({ message: (error as Error).message, statusSeverity: 'error' })
  //   }
  // }

  const initializeAuthor = async () => {
    if (isNew) {
      setAuthor({ firstName: "", lastName: "" , nativeLanguage: Language.SPANISH})
    } else {
      try {
        const authorData = await authorService.getAuthorById(authorId)
        setAuthor(authorData)
      } catch (error) {
        showMessage({ message: (error as Error).message, statusSeverity: "error" })
      }
    }
  }

  useInitialize(initializeAuthor)

  const handleChange = (e:  SelectChangeEvent<Language> | React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown }>) => {
    const { name, value } = e.target 
    if (name) {
      setAuthor(prevAuthor => {
        if (prevAuthor) {
          return { ...prevAuthor, [name]: value }
        }
        return prevAuthor
      })
    }
  }

  const validate = () => {
    const newErrors = {
      firstName: author.firstName ? "" : "Complete el campo",
      lastName: author.lastName ? "" : "Complete el campo",
    };
    setErrors(newErrors);
    return newErrors.firstName === "" && newErrors.lastName === "";
  }
  const isFieldEmpty = (field: string) => field.trim() === ""

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom> {isNew ? "Agregar Autor" : "Editar Autor"}</Typography>

      
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre" 
              name="firstName"
            value={author.firstName}
            onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "1rem", width: "100%" }}
            // error={isFieldEmpty(author.firstName)}
            // helperText={isFieldEmpty(author.firstName) ? 'Complete el campo' : ''}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Apellido"
            name="lastName"
            value={author?.lastName || ""}  
            onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "1rem", width: "100%" }}
            // Sirve manejo de errores? cuando se supone que va a saltar el error? para mi nunca.
            // error={isFieldEmpty(author.lastName)}
            // helperText={isFieldEmpty(author.lastName) ? 'Complete el campo' : ''}
            // error={!!errors.lastName}
            // helperText={errors.lastName}
          />

          <FormControl variant="outlined" sx={{ marginBottom: "1rem", width: "100%" }}>
            <InputLabel>Idioma Nativo</InputLabel>
            <Select
              name="nativeLanguage"
              value={author.nativeLanguage}
              onChange={handleChange}
              label="Idioma Nativo"
            >
              {Object.keys(Language).map((lang) => (
                <MenuItem key={lang} value={lang}>{lang}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Container sx={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            <Button
              variant="outlined" startIcon={<ArrowBackIcon />}
              onClick={handleBack} sx={{ marginBottom: "1rem" }}
            >Volver
            </Button>

            <Button type="submit" variant="contained" sx={{ marginBottom: "1rem" }}
            disabled={isFieldEmpty(author.firstName) || isFieldEmpty(author.lastName)}>Guardar Cambios</Button>
          </Container>
        </form>
      
    </Container>
  )
}
