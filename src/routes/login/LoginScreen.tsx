import { useContext } from "react";
import { sessionContext } from "../root/Root";
import { User } from "../../model/User";
import Dummy from "../../components/Dummy/Dummy";


export default function LoginScreen() {

    const { userState } = useContext( sessionContext )
    const [ user, setUser ] = userState


    return (
        <>
        <Dummy user={ user } />
        <button 
            onClick={ () => setUser( 
                new User( 1, "Simpson", "Homero", "hsimpson", new Date(1981, 4, 4), "homer@simps.com" )
            ) }
        >Loguearse</button>
        </>
    )
}