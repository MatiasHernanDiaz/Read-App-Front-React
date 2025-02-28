import { Book, Dashboard, Logout, People } from "@mui/icons-material"
import { AppBar, Avatar, Box, Button, ButtonGroup, Stack, Toolbar, Typography } from "@mui/material"
import { Link, Outlet, useLocation } from "react-router-dom"
import { loginService } from "../../services/loginService"
import { createContext, useContext, useState } from "react"
import { sessionContext } from "../root/Root"
import Message from "../../components/Message/Message"
import { AxiosError, AxiosResponse } from "axios"


export const msjContext = createContext({} as {showMessage: (data: AxiosResponse,refreshData?:()=>void)=>void})


const pageTitles = [
    { routePattern: /app\/dashboard/i, title: 'Indicadores' },
    { routePattern: /app\/authors$/i, title: 'Autores' },
    { routePattern: /app\/authors\/new$/i, title: 'Nuevo autor' },
    { routePattern: /app\/authors\/[0-9]+$/i, title: 'Editar autor' },
    { routePattern: /app\/books$/i, title: 'Libros' },
    { routePattern: /app\/books\/new$/i, title: 'Nuevo libro' },
    { routePattern: /app\/books\/[0-9]+$/i, title: 'Editar libro' },
]

export default function MainFrame() {

    const location = useLocation()

    const pageTitle = pageTitles.find( page => page.routePattern.test( location.pathname ) )?.title
    
    const [ user, setUser ] = useContext( sessionContext )

    const [message, setMessage] = useState<AxiosResponse>({status:0, data:''} as AxiosResponse)

    const handleLogout = async () => {
        try {
            await loginService.logout()
        } catch(e : unknown){
            showMessage((e as AxiosError<unknown>).response!)
        }
        finally{ 
            setUser( null )
            localStorage.removeItem('user')
        }
    }


    const showMessage = (res: AxiosResponse,refreshData?:()=>void) =>{
        if (refreshData){refreshData()}
        setMessage(res ? res : {status:500, data:{message:'Error de conexión'}} as AxiosResponse)
        setTimeout(()=>{
            setMessage({status:0, data:''} as AxiosResponse)
        },3000)
    }
    return (
        
        <Stack
            height="100%"
            justifyContent="space-between"
            sx={{
                backgroundImage: "url('/assets/loginFondo.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: "yellow",
                zIndex:"-1",
                }}
        >
            <AppBar
                sx={{ padding: '10px', backgroundColor:'#F25D0B' }}
            >
                <Toolbar sx={{ justifyContent: "space-between", padding: 0 }}>
                    <Typography variant="h5">ReadApp - { pageTitle }</Typography>
                    <Avatar src={ user?.avatar } />
                </Toolbar>
            </AppBar>
            <Box sx={{marginTop: 12, overflowY: "auto"}}>
                <Message res={message}/>
                <msjContext.Provider value={{showMessage}}>
                    <Outlet />
                </msjContext.Provider>
            </Box>

            <ButtonGroup
                fullWidth
                size="large"
                sx={{
                    justifyContent: 'space-around',
                }}
            >
                <Button
                    variant={ location.pathname.includes( 'dashboard' ) ? 'outlined' : 'contained' }
                    sx={{ 
                        borderRadius: 0, 
                        backgroundColor: '#F25D0B',
                        color: 'white',
                        '&:focus': {
                        color: '#ffbc87'
                    } }}
                    component={ Link }
                    to='dashboard'
                ><Dashboard /></Button>
                <Button
                    variant={ location.pathname.includes( 'books' ) ? 'outlined' : 'contained' }
                    component={ Link }
                    sx={{
                        backgroundColor: '#F25D0B',
                        color: 'white',
                        '&:focus': {
                        color: '#ffbc87'
                    }}}
                    to='books'
                ><Book /></Button>
                <Button
                    variant={ location.pathname.includes( 'authors' ) ? 'outlined' : 'contained' }
                    component={ Link }
                    sx={{
                        backgroundColor: '#F25D0B', 
                        color: 'white',
                        '&:focus': {
                        color: '#ffbc87'
                    }}}
                    to='authors'
                ><People /></Button>
                
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ 
                        borderRadius: 0 ,
                        backgroundColor: '#F25D0B',
                        color: 'white'
                        }}
                    onClick={ handleLogout }
                ><Logout /></Button>
            </ButtonGroup>
        </Stack>
    )
}