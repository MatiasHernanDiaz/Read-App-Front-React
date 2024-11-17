import { Alert, AlertTitle } from "@mui/material";
import { Msj } from "../../routes/app/MainFrame";



export default function Message({message} : {message:Msj}){
    //severity = success, error, warnings
    

    return(
        <>
            {message.message && 
                <Alert  variant="filled" severity={message.statusSeverity} sx={{position:"absolute", width:"80%", marginLeft:"5%",zIndex:50}}>
                        <AlertTitle>{message.statusSeverity}</AlertTitle>
                        <strong>{message.message}</strong> 
                </Alert>
            }
        </>
    )
}