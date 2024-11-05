import { Book, Dashboard, Logout, People } from "@mui/icons-material"
import { AppBar, Avatar, Box, Button, ButtonGroup, Stack, Toolbar, Typography } from "@mui/material"
import { Form, Link, Outlet, redirect, useLocation, useOutletContext } from "react-router-dom"
import { User } from "../../model/User"


export async function action () {
    await fetch('http://localhost:9000/auth/logout')

    return redirect( '/login' )
}

export default function App() {

    const location = useLocation()
    
    const user = useOutletContext() as User

    
    return (

        <Stack
            height="100%"
            justifyContent="space-between"
        >
            <AppBar
                sx={{ padding: '10px' }}
            >
                <Toolbar sx={{ justifyContent: "space-between", padding: 0 }}>
                    <Typography variant="h5">ReadApp</Typography>
                    <Avatar src={ user?.avatar } />
                </Toolbar>
            </AppBar>
            <Box sx={{marginTop: 10, overflowY: "auto"}}><Outlet /></Box>

            <ButtonGroup
                fullWidth
                size="large"
                sx={{
                    justifyContent: 'space-around',
                }}
            >
                <Button
                    variant={ location.pathname.includes( 'dashboard' ) ? 'outlined' : 'contained' }
                    sx={{ borderRadius: 0 }}
                    component={ Link }
                    to='dashboard'
                    state={{
                        title: "Dashboard"
                    }}
                ><Dashboard /></Button>
                <Button
                    variant={ location.pathname.includes( 'books' ) ? 'outlined' : 'contained' }
                    component={ Link }
                    to='books'
                    state={{
                        title: "Libros"
                    }}
                ><Book /></Button>
                <Button
                    variant={ location.pathname.includes( 'authors' ) ? 'outlined' : 'contained' }
                    component={ Link }
                    to='authors'
                    state={{
                        title: "Autores"
                    }}
                ><People /></Button>
                <Form method="post">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ borderRadius: 0 }}
                    ><Logout /></Button>
                </Form>
            </ButtonGroup>
        </Stack>
    )
}