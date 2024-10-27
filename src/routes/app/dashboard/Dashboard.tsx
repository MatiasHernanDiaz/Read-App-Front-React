import { Button, Divider } from "@mui/material"
import { useState } from "react"
import Inicator from "../../../components/indicator/indicator"
import './Dashboard.css'


export default function Dashboard () {

    const indicatorsStub = [
        {title: 'Recomendaciones', value: 53, icon:'WorkspacePremiumIcon'}, 
        {title: 'Libros en sistema', value: 43, icon:'AutoStoriesIcon'}, 
        {title: 'Usuarios totales', value: 9, icon:'PeopleIcon'}, 
        {title: 'Centros de distribución', value: 12, icon:'StorefrontIcon'}]

    const [indicators, setIndicators] = useState(indicatorsStub)

    return (
        <div className="dashboard-container">
            <h1>Indicadores</h1>
            <ul className="indicator-list">
                {indicators.map( (indi, index) =>
                <li className="itemList">
                    <Inicator key={'indicator_'+index} title={indi.title} icon={indi.icon } value={indi.value} ></Inicator>
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


