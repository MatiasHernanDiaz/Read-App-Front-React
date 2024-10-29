import { Button, Divider, Stack, Typography } from "@mui/material"
import Inicator from "../../../components/indicator/indicator"
import PeopleIcon from '@mui/icons-material/People'
import StorefrontIcon from '@mui/icons-material/Storefront'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import './Dashboard.css'
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

    const indicators = useLoaderData() as indicator[]

    console.log("indicadores -> ", indicators)

    const icons = [
        <WorkspacePremiumIcon fontSize="large"/>, 
        <AutoStoriesIcon fontSize="large"/>, 
        <PeopleIcon fontSize="large"/>, 
        <StorefrontIcon fontSize="large"/>]

    return (
        <Stack className="dashboard-container">
            <h1>Indicadores</h1>
            <ul className="indicator-list">
                {indicators.map( (indi : indicator, index: number) =>
                <li className="itemList" key={index}>
                    <Inicator title={indi.title} icon={icons[index] } value={indi.total} ></Inicator>
                </li>
            )}
            </ul>
            <Divider className="divider" variant="middle" sx={{ borderColor: 'black', borderWidth: 1 }} ></Divider>
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


export type indicator = {title:string, total: number}