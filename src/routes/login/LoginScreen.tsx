import { useOutletContext } from "react-router-dom";
import { MouseEvent, useState } from 'react';
import { Stack, TextField, Button, IconButton, InputAdornment} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import fondo from './loginFondo.png';
import { User } from "../../model/User";
import { loginService } from "../../services/loginService";
import { AxiosError } from "axios";


// export async function action ({request}:{request:Request}) {
//     const credentials = await request.json() as {email:string, password:string}
//     console.log("credenciales",credentials)
//     await LoginService.login(credentials.email,credentials.password)
    
//     return null
//   }

export default function LoginScreen() {

    const [ user, setUser ] = useOutletContext() as [ 
        User | null, React.Dispatch<React.SetStateAction<User | null>>]

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
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
            const res = await loginService.login( email, password )

            if( !res.login ) {
                setPasswordError("Credenciales inválidas.")
                hasError = true
            }

            setUser( res.user )

        } catch ( error: unknown ){
            console.error( error )
            if( (error as AxiosError).status === 403 ) {
                setPasswordError("Credenciales inválidas.")
            }
            
            setPasswordError("Credenciales inválidas.")
        }
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

        <Stack 
            // method='post' 
            // onSubmit={handleLogin as unknown as FormEventHandler<HTMLFormElement>}
            onKeyDown={ e => e.key === 'Enter' && handleLogin() }
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
                // type="submit"
                variant="contained"   
                sx={{
                        backgroundColor: 'rgb(242, 93, 11)', 
                        
                    }}      
                onClick={ handleLogin }
            >Ingresar</Button>
            </Stack>
    </Stack>
    )
}
