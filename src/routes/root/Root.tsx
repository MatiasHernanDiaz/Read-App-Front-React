import { Navigate, Outlet } from "react-router-dom"
import { User } from "../../model/User"
import { createContext, useState } from "react"
import { useInitialize } from "../../hooks/useInitialize"
import { loginService } from "../../services/loginService"

// export const sessionContext = createContext( {} as User )

export default function Root() {
    const loginState = useState<User | null>(null)

    const [ user, setUser ] = loginState


    useInitialize( async () => {
        const newUser = await loginService.getSignedUser()

        setUser( newUser )
    })


    return (
        <>
        <Outlet context={ loginState } />
        {
            user ? 
            <Navigate to='app/books' replace={ true } /> :
            <Navigate to='login' replace={ true } />
        }
        </>
    )
}