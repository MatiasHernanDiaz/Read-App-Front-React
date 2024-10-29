import { Button, Divider } from "@mui/material"
import { useState } from "react"
import Inicator from "../../../components/indicator/indicator"
import PeopleIcon from '@mui/icons-material/People'
import StorefrontIcon from '@mui/icons-material/Storefront'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import './Dashboard.css'


export default function Dashboard () {

    const indicatorsStub = [
        {title: 'Recomendaciones', value: 53}, 
        {title: 'Libros en sistema', value: 43}, 
        {title: 'Usuarios totales', value: 9}, 
        {title: 'Centros de distribución', value: 12}]

    const icons = [
        <WorkspacePremiumIcon fontSize="large"/>, 
        <AutoStoriesIcon fontSize="large"/>, 
        <PeopleIcon fontSize="large"/>, 
        <StorefrontIcon fontSize="large"/>]

    const [indicators, setIndicators] = useState(indicatorsStub)

    return (
        <div className="dashboard-container">
            <h1>Indicadores</h1>
            <ul className="indicator-list">
                {indicators.map( (indi, index) =>
                <li className="itemList" key={index}>
                    <Inicator title={indi.title} icon={icons[index] } value={indi.value} ></Inicator>
                </li>
            )}
            </ul>
            <Divider className="divider" variant="middle" sx={{ borderColor: 'black', borderWidth: 1 }} ></Divider>
            <div className="btn-container">
                <h2>Acciones</h2>
                <Button variant="contained">Borrar usuarios inactivos</Button>
                <Button variant="contained">Borrar centros inactivos</Button>
            </div>
        </div>
    )
}


