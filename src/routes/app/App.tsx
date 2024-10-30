import { useContext } from "react"
import { sessionContext } from "../root/Root"
import Dummy from "../../components/Dummy/Dummy"
import BookContainer from "../bookContainer/BookContainer"

export default function App() {

    const { userState } = useContext( sessionContext )
    const [ user, setUser ] = userState

    return (
        <>
        <h1>Layout general</h1>
        <Dummy user={ user } />
        <button 
            onClick={ () => setUser( null ) }
        >Logout</button>
        <BookContainer/>
        </>
    )
}