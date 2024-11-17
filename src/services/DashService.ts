import axios from "axios"
import { DashboardData } from "../routes/app/dashboard/Dashboard"
import { Msj } from "../routes/app/MainFrame"

const REST_SERVER_URL = 'http://localhost:9000/'

class DashService{

    constructor(){}

    async getDataDash(){
        const dashJSON$ = await axios.get<DashboardData>(REST_SERVER_URL + 'dashboard')
        return dashJSON$.data
    }

    async deleteUser(){
        const msgJSON$ = await axios.get<Msj>(REST_SERVER_URL + 'usersclean')
        return msgJSON$.data
    }

    async delteCenter(){
        const msgJSON$ = await axios.get<Msj>(REST_SERVER_URL + 'readcenterclean')
        return msgJSON$.data
    }
}


export const dashService = new DashService()