import { Button, TextField, Container, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useNavigate, useParams } from "react-router-dom"
import { authorService } from "../../../services/authorService"
import { Author, Language } from "../../../model/Author"
import { useContext, useState } from "react"
import { msjContext } from "../MainFrame"
import { useInitialize } from "../../../hooks/useInitialize"
import { AxiosError } from "axios"

export const authorInit = new Author(-1,'','',Language.SPANISH)

export default function AuthorEdit() {
  
  const { showMessage } = useContext(msjContext)
  const navigate = useNavigate()
  const { id } = useParams() 
  const authorId = parseInt(id || "0", 10)
  const isNew = !id

  const [author, setAuthor] = useState<Author>(authorInit)

  const [errors, setErrors] = useState<{ firstName: string; lastName: string }>({
    firstName: "",
    lastName: ""
  })

  const getAuthor = async () => {
    if(!isNew){
      try {
        const authorData = await authorService.getAuthorById(authorId)
        setAuthor(authorData)
      } catch(e : unknown){
        showMessage((e as AxiosError<unknown>).response!)
    }
    }
  }

  useInitialize(getAuthor)
  
  const handleBack = () => {
    navigate(-1) 
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()//envia al back sin refrescar pagina
    if (validate()) {
      try {
        if (isNew) {
          const res = await authorService.createAuthor(author)
          showMessage(res)
          handleBack()
        } else {
          const res = await authorService.updateAuthor(authorId, author)
          showMessage(res)
          handleBack()
        }        
      }catch(e : unknown){
        showMessage((e as AxiosError<unknown>).response!, getAuthor)
    }
    }
  }

  const validate = () => {
    const newErrors = {
      lastName: author.lastName ? "" : "Complete el campo",
      firstName: author.firstName ? "" : "Complete el campo"
    }
    setErrors(newErrors)
    return newErrors.firstName === "" && newErrors.lastName === ""
  }

  const handleChange = (e:  SelectChangeEvent<Language> | React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown }>) => {
    const { name, value } = e.target 
    if (name) {
      setAuthor(prevAuthor => {
        if (prevAuthor) {
          return { ...prevAuthor, [name]: value as Language }
        }
        return prevAuthor
      })
    }
  }

  return (
    <Container sx={{ marginTop: "2rem" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre" 
            name="firstName"
            value={author?.firstName || ""}
            onChange={handleChange}
            variant="outlined"
            sx={{ 
              marginBottom: "1rem", 
              width: "100%",
              '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'rgb(242, 93, 11)'
                        },
                     },
                     '& .MuiInputLabel-root.Mui-focused': {
                        color: 'black'
                    },

            }}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Apellido"
            name="lastName"
            value={author?.lastName || ""}  
            onChange={handleChange}
            variant="outlined"
            sx={{
               marginBottom: "1rem", 
               width: "100%",
              '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'rgb(242, 93, 11)'
                        },
                     },
                     '& .MuiInputLabel-root.Mui-focused': {
                        color: 'black'
                    },
            }}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />

          <FormControl 
          variant="outlined" 
          sx={{
            marginBottom: "1rem",
            width: "100%",
            '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'rgb(242, 93, 11)'
                        },
                     },
                     '& .MuiInputLabel-root.Mui-focused': {
                        color: 'black'
                    },
          }}
          >
            <InputLabel>Idioma Nativo</InputLabel>
            <Select
              name="nativeLanguage"
              value={author.nativeLanguage || Language.SPANISH}
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
              onClick={handleBack} sx={{ marginBottom: "1rem", backgroundColor:'#aaa', color:'white', borderColor:'#aaa'}}
            >Volver</Button>

            <Button type="submit" variant="contained" sx={{ marginBottom: "1rem", backgroundColor:'#F25D0B' }}
            >Guardar Cambios</Button>
          </Container>
        </form>
    </Container>
  )
}
