import { useContext } from "react";
import { sessionContext } from "../root/Root";


export default function LoginScreen() {

    const { userState } = useContext( sessionContext )
    const [ user, setUser ] = userState

    setUser(null) // TODO: Eliminar. Sólo lo uso para que no llore el transpilador

    return <p>El usuario logueado es { user ? user.displayName : 'nadie' }</p>
}