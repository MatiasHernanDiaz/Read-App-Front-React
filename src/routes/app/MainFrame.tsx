import { Book, Dashboard, Logout, People } from "@mui/icons-material"
import { AppBar, Avatar, Box, Button, ButtonGroup, Stack, Toolbar, Typography } from "@mui/material"
import { Link, Outlet, useLocation } from "react-router-dom"
import { loginService } from "../../services/loginService"
import { createContext, useContext, useState } from "react"
import { sessionContext } from "../root/Root"
import Message from "../../components/Message/Message"
import { AxiosResponse } from "axios"


export const msjContext = createContext({} as {showMessage: (data: AxiosResponse,refreshData?:()=>void)=>void})


export default function MainFrame() {

    const location = useLocation()
    
    const [ user, setUser ] = useContext( sessionContext )

    const [message, setMessage] = useState<AxiosResponse>({status:0, data:''} as AxiosResponse)

    const handleLogout = async () => {

        try {
            await loginService.logout()
            setUser( null )
        } catch {
            console.log('Logout fallido')
        }

    }

    const showMessage = (res: AxiosResponse,refreshData?:()=>void) =>{
        if (refreshData){refreshData()}
        setMessage(res)
        setTimeout(()=>{
            setMessage({status:0, data:''} as AxiosResponse)
        },3000)
    }
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
            <Box sx={{marginTop: 10, overflowY: "auto"}}>
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
                    sx={{ borderRadius: 0 }}
                    component={ Link }
                    to='dashboard'
                ><Dashboard /></Button>
                <Button
                    variant={ location.pathname.includes( 'books' ) ? 'outlined' : 'contained' }
                    component={ Link }
                    to='books'
                ><Book /></Button>
                <Button
                    variant={ location.pathname.includes( 'authors' ) ? 'outlined' : 'contained' }
                    component={ Link }
                    to='authors'
                ><People /></Button>
                
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ borderRadius: 0 }}
                    onClick={ handleLogout }
                ><Logout /></Button>
            </ButtonGroup>
        </Stack>
    )
}