import { Button, Divider, Stack, Typography } from "@mui/material"
import Inicator from "../../../components/indicator/indicator"
import PeopleIcon from '@mui/icons-material/People'
import StorefrontIcon from '@mui/icons-material/Storefront'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
// import './Dashboard.css'
import { useLoaderData } from "react-router-dom"



export async function loader() {
    const data = await fetch(
        'http://localhost:9000/dashboard',
        {
            method: 'get'
        }
    )
    return await data.json()
}

export default function Dashboard () {

    const indicators = useLoaderData() as DashboardData

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
                <Button variant="contained" sx={{fontSize:12}}>Borrar usuarios inactivos</Button>
                <Button variant="contained" sx={{fontSize:12}}>Borrar centros inactivos</Button>
            </Stack>
        </Stack>
    )
}


export type DashboardData = Record<string, {amount:number}>