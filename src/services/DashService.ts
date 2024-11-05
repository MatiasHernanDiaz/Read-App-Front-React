const REST_SERVER_URL = 'http://localhost:9000/'

class DashService{

    constructor(){}

    async getDataDash(){
        const data = await fetch(
            REST_SERVER_URL + 'dashboard',
            {
                method: 'get'
            }
        )
        return await data.json()
    }

    async delteUser(){
        const data = await fetch(
            REST_SERVER_URL + 'usersclean',
            {
                method: 'get'
            }
        )
    return await data.json()
    }

    async delteCenter(){
        const data = await fetch(
            REST_SERVER_URL + 'readcenterclean',
            {
                method: 'get'
            }
        )
    return await data.json()
    }
} 

export const dashService = new DashService()