import axios from "axios";
import { User } from "../model/User";

type AuthResponse = {
    login: boolean,
    user: User | null
}

class LoginService {

    baseUrl = 'http://localhost:9000/auth/'

    async login( email: string, password: string ) {
        const response = await axios.post<AuthResponse>( this.baseUrl + 'loginAdmin', { email, password } )

        return response.data;
    }

    async getSignedUser() {
        const res = await axios.get<AuthResponse>('http://localhost:9000/auth/loginAdmin')

        return res.data.user
    }

    async logout() {
        const response = await axios.get( this.baseUrl + 'logoutAdmin' )

        return response
    }
}

export const loginService = new LoginService()