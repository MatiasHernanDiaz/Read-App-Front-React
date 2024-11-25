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
import { AxiosError } from "axios"


export type DashboardData = Record<string, {amount:number}>


export default function Dashboard () {
    
    const [indicators, setIndicators] = useState<DashboardData>()
    const {showMessage} = useContext(msjContext)

    const getDash = async() => {
        try{
            const res = await dashService.getDataDash()
            setIndicators(res)
        }catch(e : unknown){
            showMessage((e as AxiosError<unknown>).response!)
        }
    }

    const deleteUser = async () => {
        try{
            const res = await dashService.deleteUser()
            showMessage(res, getDash)    
        }catch(e : unknown){
            showMessage((e as AxiosError<unknown>).response!, getDash)
        }
    }
    
    const deleteCenter = async () =>{
        try{
            const res = await dashService.delteCenter()
            showMessage(res,getDash)
        }catch(e : unknown){
            showMessage((e as AxiosError<unknown>).response!, getDash)
        }
    }

    useInitialize(getDash)
    console.log('indicator', indicators)
    return (
        <Stack  alignItems={"center"} >
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
                    btnTitle='Borrar usuarios inactivos' 
                    title="¿Seguro que desea eliminar usuarios inactivos?" 
                    description="Los cambios no se podrán deshacer"
                    setAction={deleteUser}
                />
                <BtnDelete 
                    btnTitle="Borrar centros inactivos"
                    title="¿Seguro que desea eliminar centros inactivos?"
                    description="Los cambios no se podrán deshacer"
                    setAction={() => deleteCenter()}
                />
            </Stack>
        </Stack>
    )
}





