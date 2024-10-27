import { useContext } from "react"
import { sessionContext } from "../root/Root"
import { Apple, Book, Dashboard, Logout, People } from "@mui/icons-material"
import { AppBar, Box, Button, ButtonGroup, Stack, Toolbar, Typography } from "@mui/material"
import { Link, Outlet, useLocation } from "react-router-dom"


const titlesByURL = {
    ['dashboard']: 'Dashboard',
    ['books']: 'Libros',
    ['authors']: 'Autores',
}

export default function App() {

    const location = useLocation()
    const { userState } = useContext( sessionContext )
    const [ user, setUser ] = userState


    return (
        <Stack
            height="100%"
            justifyContent="space-between"
        >
            <AppBar
                sx={{ padding: '10px' }}
            >
                <Typography variant="h5">ReadApp - { location.state.title }</Typography>
            </AppBar>
            <Box><Outlet /></Box>

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
                <Button
                    variant="contained"
                    sx={{ borderRadius: 0 }}
                    onClick={ () => {setUser( null )} }
                ><Logout /></Button>
            </ButtonGroup>
        </Stack>
    )
}