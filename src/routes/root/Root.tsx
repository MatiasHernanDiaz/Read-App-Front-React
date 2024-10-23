import { createContext, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { User } from "../../model/User"

export const sessionContext = createContext({} as {
    userState: [User | null, React.Dispatch<React.SetStateAction<User | null>>]
})

export default function Root() {

    const userState = useState<User | null>( null )
    const [ user, setUser ] = userState

    setUser(null) // TODO: Eliminar. Sólo lo uso para que no llore el transpilador
   
    return (
        <sessionContext.Provider value={{ userState }}>
        <Outlet />
        {
            user ? 
            <Navigate to='app/dashboard' replace={ true } /> :
            <Navigate to='login' replace={ true } />
        }
        </sessionContext.Provider>
    )
}