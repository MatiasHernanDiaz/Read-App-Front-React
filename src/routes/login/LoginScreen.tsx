import { Form } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Button, IconButton, InputAdornment} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import fondo from './loginFondo.png';
import LoginService from '../../service/LoginService';



// sin este export no funciona ni siquiera me muestra algo. 
export async function action () {
    await fetch(
        'http://localhost:9000/auth/login'  
    )
  }

export default function LoginScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const navigate = useNavigate()
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    
    const handleLogin = async () => {
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

        try {
            await LoginService.login(email, password)
            console.log("login exitoso",  LoginService.login(email, password ))
            navigate('/app/dashboard')
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error)
            setPasswordError("Credenciales invalidas.")
        }

        // estoy agarrando el error aca y en el loginService, 
        //yo creo que es mejor agarrarlo solo aca pero por ahora no pude conseguirlo.
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
            backgroundPosition:'center' // solo para que se vea mejor, hay que elegir otra imagen.  
    }}
    >
        <h1
            style={{
                fontSize: "4rem" 
            }}
        >ReadApp</h1>

        <Form 
            //method='post' esto creo que ya no lo necesito 
            onSubmit={handleLogin}
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
