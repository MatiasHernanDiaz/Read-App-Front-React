import { Alert, AlertTitle, Divider, Stack, Typography } from "@mui/material"
import Inicator from "../../../components/Indicator/Indicator"
import PeopleIcon from '@mui/icons-material/People'
import StorefrontIcon from '@mui/icons-material/Storefront'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { useLoaderData } from "react-router-dom"
import { dashService } from "../../../services/DashService"
import { useState } from "react"
import BtnDelete from "../../../components/BtnDelete/BtnDelete"


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
    const [showMessage, setShowMessage] = useState('')
    
    const inputBtnUser = {
        btnTitle : "Borrar usuarios inactivos",
        title: "¿Seguro que desea eliminar usuarios inactivos?",
        description: "Se eliminaran todos los usuarios inactivos sin posibilidad de revertir los cambios"
    }

    const inputBtnCenter = {
        btnTitle : "Borrar centros inactivos",
        title: "¿Seguro que desea eliminar centros inactivos?",
        description: "Se eliminaran todos los centros inactivos sin posibilidad de revertir los cambios"
    }

                
    const delteUser = async () => {
            try{
                let conditionMsj = 'true'
                const data = await dashService.delteUser()
                setIndicators(data)
                if(data.users.amount === indicators.users.amount){
                    conditionMsj = 'equals'
                }
                setShowMessage(conditionMsj)
                setTimeout(()=>{
                    setShowMessage('')
                },3000)
            }
            catch(e){
                console.info(e)
                setShowMessage('false')
                setTimeout(()=>{
                    setShowMessage('')
                },3000)
            }
    }
    
    const deleteCenter = async () =>{
        try{
            let conditionMsj = 'true'
            const data = await dashService.delteCenter()
            setIndicators(data)
            if(data.readingCenter.amount === indicators.readingCenter.amount){
                conditionMsj = 'equals'
            }
            setShowMessage(conditionMsj)
                setTimeout(()=>{
                    setShowMessage('')
                },3000)
        }
        catch(e){
            console.info(e)
            setShowMessage('false')
            setTimeout(()=>{
                setShowMessage('')
            },3000)
        }
    }
    
    return (
        <Stack  alignItems={"center"} >
            <Typography variant="h4" marginBottom={2} >
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
                <BtnDelete 
                btnTitle={inputBtnUser.btnTitle} 
                title={inputBtnUser.title} 
                description={inputBtnUser.description} 
                setAction={() => delteUser()}/>
                <BtnDelete 
                btnTitle={inputBtnCenter.btnTitle} 
                title={inputBtnCenter.title} 
                description={inputBtnCenter.description} 
                setAction={() => deleteCenter()}/>
            </Stack>
            {
            showMessage === 'true' && <Alert variant="filled" severity="success" sx={{position:"absolute"}}>
                <AlertTitle>Success</AlertTitle>
                <strong>Se han eliminado correctamente</strong> 
                    </Alert>  
            }
            {
            showMessage === 'false' && <Alert variant="filled" severity="error" sx={{position:"absolute"}}>
                    <AlertTitle>Error</AlertTitle>
                        <strong>Error al intentar eliminar</strong>
                </Alert>
            }
            {
            showMessage === 'equals' && <Alert variant="filled" severity="warning" sx={{position:"absolute"}}>
                    <AlertTitle>Warning</AlertTitle>
                        <strong>Ya esta actualizada la base</strong>
                </Alert>
            }
            

        </Stack>
    )
}





