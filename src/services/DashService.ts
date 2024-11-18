import axios, { AxiosResponse } from "axios"
import { DashboardData } from "../routes/app/dashboard/Dashboard"

const REST_SERVER_URL = 'http://localhost:9000/'

class DashService{

    constructor(){}

    async getDataDash(){
        const dashJSON$ = await axios.get<DashboardData>(REST_SERVER_URL + 'dashboard')
        return dashJSON$.data
    }

    async deleteUser(){
        return await axios.get(REST_SERVER_URL + 'usersclean')
    }

    async delteCenter(){
        return await axios.get<AxiosResponse>(REST_SERVER_URL + 'readcenterclean')
        //return msgJSON$.data
    }
}


export const dashService = new DashService()