import { Alert, AlertTitle } from "@mui/material";
import { AxiosResponse } from "axios";



export default function Message({res} : {res:AxiosResponse}){
    //severity = success, error, warnings
    const message = res.status >= 200 && res.status < 300 ? res.data : res.data.message

    // const message =
    // typeof res.data === "string"
    //   ? res.data
    //   : res.data?.message || "Mensaje no disponible"

    const setStatus = ()  => {
        if(res.status >= 200 && res.status <=299){
            return "success"
        }
        return "error"
    }
    
    return(
        <>
            { res.data && 
                <Alert  variant="filled" severity={setStatus()} sx={{position:"absolute", width:"80%", marginLeft:"5%",zIndex:50}} data-testid="alert">
                        <AlertTitle>{message}</AlertTitle>
                </Alert>
            }
        </>
    )
}