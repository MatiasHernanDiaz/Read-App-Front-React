import { useContext } from "react";
import { sessionContext } from "../root/Root";


export default function LoginScreen() {

    const { userState } = useContext( sessionContext )
    const [ user, setUser ] = userState

    return <p>El usuario logueado es { user ? user.displayName : 'nadie' }</p>
}