import { Divider, Stack, Typography } from "@mui/material"
import Inicator from "../../../components/Indicator/Indicator"
import PeopleIcon from '@mui/icons-material/People'
import StorefrontIcon from '@mui/icons-material/Storefront'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { dashService } from "../../../services/DashService"
import { useContext, useState } from "react"
import BtnDelete from "../../../components/BtnDelete/BtnDelete"
import { useInitialize } from "../../../hooks/useInitialize"
import { msjContext } from "../MainFrame"


export type DashboardData = Record<string, {amount:number}>


export default function Dashboard () {
    
    const [indicators, setIndicators] = useState<DashboardData>()
    const {showMessage} = useContext(msjContext)
    
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

    const getDash = async() => {
        try{
            const data = await dashService.getDataDash()
            setIndicators(data)
        }
        catch(error){
            showMessage({message:(error as Error).message, statusSeverity:'error'})
        }
    }

    const deleteUser = async () => {
                try{
                    const data = await dashService.deleteUser()
                    showMessage(data,getDash)
                }
                catch(error){
                    showMessage({message:(error as Error).message, statusSeverity:'error'})
                }
    }
    
    const deleteCenter = async () =>{
            try{
                const data = await dashService.delteCenter()
                showMessage(data,getDash)
            }
            catch(error){
                showMessage({message:(error as Error).message, statusSeverity:'error'})
            }
    }

    useInitialize(getDash)
    
    return (
        
        <Stack  alignItems={"center"} >
            <Typography variant="h4" marginBottom={2} >
                    Indicadores
                </Typography>
                {indicators && 
                    <Stack spacing={2}>
                            <Inicator title={"Recomendaciones"} icon={<WorkspacePremiumIcon fontSize="large"/>} value={indicators.recoms.amount} ></Inicator>
                            <Inicator title={"Libros en sistema"} icon={<AutoStoriesIcon fontSize="large"/>} value={indicators.books.amount} ></Inicator>
                            <Inicator title={"Usuarios"} icon={<PeopleIcon fontSize="large"/>} value={indicators.users.amount} ></Inicator>
                            <Inicator title={"Centros de lectura"} icon={<StorefrontIcon fontSize="large"/>} value={indicators.readingCenter.amount} ></Inicator>
                    </Stack>
                }
            <Divider variant="middle" sx={{ borderColor: 'black', borderWidth: 1, width:"70%", margin:3 }} ></Divider>
            <Stack gap={2} width={"70%"} marginBottom={2}>
                <Typography variant="h6">
                    Acciones
                </Typography>
                <BtnDelete 
                btnTitle={inputBtnUser.btnTitle} 
                title={inputBtnUser.title} 
                description={inputBtnUser.description} 
                setAction={() => deleteUser()}/>
                <BtnDelete 
                btnTitle={inputBtnCenter.btnTitle} 
                title={inputBtnCenter.title} 
                description={inputBtnCenter.description} 
                setAction={() => deleteCenter()}/>
            </Stack>
        </Stack>
    )
}





