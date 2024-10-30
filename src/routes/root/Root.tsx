import { useState } from "react"
import { Navigate, Outlet, useLoaderData } from "react-router-dom"
import { User } from "../../model/User"


export async function loader() {
    const res = await fetch('http://localhost:9000/auth/login')

    const { user } = await res.json()

    return user
}


export default function Root() {
    const signedUser = useLoaderData() as User | null

    const userState = useState<User | null>( signedUser )
    const [ user, _ ] = userState


    return (
        <>
        <Outlet context={ user } />
        {
            user ? 
            <Navigate to='app/dashboard' replace={ true } /> :
            <Navigate to='login' replace={ true } />
        }
        </>
    )
}