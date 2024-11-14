import { useContext, useState } from 'react';
import { Stack, TextField, Button, IconButton, InputAdornment} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import fondo from "../../../src/assets/loginFondo.png";
import { loginService } from "../../services/loginService";
import { AxiosError } from "axios";
import { sessionContext } from "../root/Root";
import { SubmitHandler, useForm } from 'react-hook-form';

interface LoginFormInputs{
    email: string
    password: string
}

export default function LoginScreen() {
    /* REACT HOOK FORM */
    const [ user, setUser ] = useContext( sessionContext )
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit, setError, formState: {errors}} = useForm<LoginFormInputs>()
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    

    const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    
        try {
            const res = await loginService.login( data.email, data.password )
            setUser( res.user )
            
        } catch ( error: unknown ){
            console.error( error )
            if( (error as AxiosError).status === 403 ) {
                setError("password", {message: "Credenciales Invalidas"})
            }
            if((error as AxiosError).code === "ERR_NETWORK"){
                setError("password", {message: "Error de conexion"})
            }
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
        <form onSubmit={handleSubmit(handleLogin)}>
        <Stack 
            style={{
                width: "20rem",
                display: 'flex', 
                flexDirection: 'column',
                gap: '50px' 
            }}
        >
            <TextField
                label="Usuario" 
                variant="outlined" 
                {...register("email", 
                    {   required: "El usuario es obligatorio.",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Debe tener formato de correo electrónico."
                        }
                    })}
                error={!!errors.email}
                helperText={errors.email?.message}
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
                {...register("password", { required: "La contraseña es obligatoria." , minLength: {value :5 , message: "La contraseña debe tener minimo 5 carcateres."}})}

                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
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
            </Stack>
            </form>
    </Stack>
    )
}
