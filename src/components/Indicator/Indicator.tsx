import { Paper, Typography } from "@mui/material";
import { ReactElement } from "react"
import './Indicator.css'

export default function Inicator({title, icon, value}:CustomIndicatorPayload){
    

    return(
        <>
            <Paper
                elevation={3}
                sx={{
                    padding: "10px",
                    borderRadius: "15px",
                    display: "flex",
                    alignItems: "center",
                    width: "250px",
                    height: "80px"
            }}
            >
                <div className="container">
                    <div className="icon-container">
                        {icon}
                    </div>
                    <div className="info-container">
                        <Typography variant="h4" component="div" fontWeight="bold">
                            {value}
                        </Typography>
                        <Typography variant="subtitle1">
                            {title}
                        </Typography>
                    </div>
                </div>
            </Paper>
        </>
    )
}

export type CustomIndicatorPayload = {
    title: string,
    icon: ReactElement<unknown, string> ,
    value: number
}