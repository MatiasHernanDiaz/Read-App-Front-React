import { Button, Divider, Stack, Typography } from "@mui/material"
import Inicator from "../../../components/indicator/indicator"
import PeopleIcon from '@mui/icons-material/People'
import StorefrontIcon from '@mui/icons-material/Storefront'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { useLoaderData } from "react-router-dom"
import { dashService } from "../../../services/dashService"
import { useState } from "react"

export type DashboardData = Record<string, {amount:number}>

export async function loader() {
    try{
        const data = dashService.getDataDash()
        return data
    }
    catch{
        console.info('No cargo la data desde loader')
    }
}

export default function Dashboard () {

    const data = useLoaderData() as DashboardData
    const [indicators, setIndicators] = useState(data) 
    
    const delteUser = async () => {
        try{
            const data = await dashService.delteUser()
            setIndicators(data)
        }
        catch{
            console.info('No cargo la data desde delete user')
        }
        finally{
            console.info('en el finally de deleteUser')
        }
    }
    
    const deleteCenter = async () =>{
        try{
            const data = await dashService.delteCenter()
            setIndicators(data)
        }
        catch{
            console.info('No cargo la data desde delete center')
        }
        finally{
            console.info('en el finally de center')
        }
    }

    return (
        <Stack  alignItems={"center"} >
            <Typography variant="h4" marginBottom={2}>
                    Indicadores
                </Typography>
            <Stack spacing={2}>
                    <Inicator title={"Recomendaciones"} icon={<WorkspacePremiumIcon fontSize="large"/>} value={indicators.recoms.amount} ></Inicator>
                    <Inicator title={"Libros en sistema"} icon={<AutoStoriesIcon fontSize="large"/>} value={indicators.books.amount} ></Inicator>
                    <Inicator title={"Usuarios"} icon={<PeopleIcon fontSize="large"/>} value={indicators.users.amount} ></Inicator>
                    <Inicator title={"Centros de lectura"} icon={<StorefrontIcon fontSize="large"/>} value={indicators.readingCenter.amount} ></Inicator>
            </Stack>
            <Divider variant="middle" sx={{ borderColor: 'black', borderWidth: 1, width:"70%", margin:3 }} ></Divider>
            <Stack gap={2} width={"70%"} marginBottom={2}>
                <Typography variant="h6">
                    Acciones
                </Typography>
                <Button variant="contained" sx={{fontSize:12}} onClick={() => delteUser(setIndicators)}>Borrar usuarios inactivos</Button>
                <Button variant="contained" sx={{fontSize:12}} onClick={() => deleteCenter()}>Borrar centros inactivos</Button>
            </Stack>
        </Stack>
    )
}





