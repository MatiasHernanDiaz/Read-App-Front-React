import { Form,  useFetcher } from "react-router-dom";
import { FormEventHandler, useState } from 'react';
import { Stack, TextField, Button, IconButton, InputAdornment} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import fondo from './loginFondo.png';
import LoginService from '../../service/LoginService';


export async function action ({request}:{request:Request}) {
    const credentials = await request.json() as {email:string, password:string}
    console.log("credenciales",credentials)
    await LoginService.login(credentials.email,credentials.password)
    
    return null
  }

export default function LoginScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const fetcher = useFetcher()


    const handleLogin = async (event:SubmitEvent) => {
        event.preventDefault()
        let hasError = false

        setEmailError("")
        setPasswordError("")

        if (!email) {
            setEmailError("El usuario es obligatorio.")
            hasError = true
        }
        if (!password) {
            setPasswordError("La contraseña es obligatoria.")
            hasError = true
        }

        if (hasError) return

        console.log("email",email)
        fetcher.submit({ email, password },{
            method: 'post',
            encType: "application/json",
        })

    }

    return (
    <Stack
        spacing={10}
        alignItems="center"
        justifyContent="center"
        sx={{
            height: '100vh',
            backgroundImage: `url(${fondo})`,
            backgroundSize: 'cover',
            backgroundPosition:'center'  
    }}
    >
        <h1
            style={{
                fontSize: "4rem" 
            }}
        >ReadApp</h1>

        <Form 
            method='post' 
            onSubmit={handleLogin as unknown as FormEventHandler<HTMLFormElement>}
            style={{
                width: '80%', 
                display: 'flex', 
                flexDirection: 'column',
                gap: '50px' 
            }}
        >
            <TextField
                label="Usuario" 
                variant="outlined" 
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                sx={{
                     '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'rgb(242, 93, 11)'
                        },
                     },
                     '& .MuiInputLabel-root.Mui-focused': {
                        color: 'black'
                    },
                }}
            />

            <TextField
                label="Contraseña" 
                variant="outlined" 
                type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    error={!!passwordError}
                    helperText={passwordError}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    sx={{
                     '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'rgb(242, 93, 11)'
                        },
                     },
                     '& .MuiInputLabel-root.Mui-focused': {
                        color: 'black'
                    },
                }}
            />       
            <Button 
                    type="submit"
                    variant="contained"   
                    sx={{
                         backgroundColor: 'rgb(242, 93, 11)', 
                         
                        }}      
                >Ingresar</Button>
            </Form>
    </Stack>
    )
}
