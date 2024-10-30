import { Form, redirect } from "react-router-dom";
import { useState } from 'react';
import { Stack, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import fondo from './loginFondo.png';



export async function action () {
    await fetch(
        'http://localhost:9000/auth/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: "marge@simps.com",
                password: "mandarina"
            }),
            credentials: 'include',
            mode: 'cors'
        }
    )

    return redirect('/app')
}

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    
    return (
    <Stack
        spacing={10}
        alignItems="center"
        justifyContent="center"
        sx={{ 
            height: '100vh',
            backgroundImage: `url(${fondo})`, // URL de tu imagen
            backgroundSize: 'cover', // Ajusta la imagen para cubrir toda la pantalla
    }}
    >
        <h1
            style={{
                
                fontSize: "4rem" // Ajustar el tamaño de la fuente (puedes usar px, em, rem, etc.)
            }}
        >ReadApp</h1>

        <Form 
            method='post'
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
            />

            <TextField
                label="Contraseña" 
                variant="outlined" 
                type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
            />
            
            <Button 
                    type="submit"
                    variant="contained"         
                >Ingresar</Button>
            </Form>
    </Stack>
    )
}