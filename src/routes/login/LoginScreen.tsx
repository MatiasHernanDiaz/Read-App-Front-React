import { useContext } from "react";
import { sessionContext } from "../root/Root";
import { Language, User } from "../../model/User";
import Dummy from "../../components/Dummy/Dummy";


export default function LoginScreen() {

    const { userState } = useContext( sessionContext )
    const [ user, setUser ] = userState


    return (
        <>
        <Dummy user={ user } />
        <button 
            onClick={ () => setUser( 
                new User( 
                    1, 
                    "Simpson", 
                    "Homero", 
                    "hsimpson", 
                    new Date(1981, 4, 4), 
                    "homer@simps.com",
                    Language.ENGLISH,
                    "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2015/03/06/14256475148639_189x0.jpg"
                )
            ) }
        >Loguearse</button>
        </>
    )
}