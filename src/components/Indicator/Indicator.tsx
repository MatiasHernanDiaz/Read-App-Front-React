import { Paper, Typography } from "@mui/material";
import { ReactElement } from "react"
import PeopleIcon from '@mui/icons-material/People'
import StorefrontIcon from '@mui/icons-material/Storefront'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import './Indicator.css'

export default function Inicator({title, icon, value}:CustomIndicatorPayload){
    
    let iconElement: ReactElement<unknown, string> = <WorkspacePremiumIcon></WorkspacePremiumIcon>

    if(icon === 'WorkspacePremiumIcon'){
        iconElement = <WorkspacePremiumIcon fontSize="large"></WorkspacePremiumIcon>
    }else if(icon === 'AutoStoriesIcon'){
        iconElement = <AutoStoriesIcon fontSize="large"></AutoStoriesIcon>
    }else if(icon === 'PeopleIcon'){
        iconElement = <PeopleIcon fontSize="large"></PeopleIcon>
    }else if(icon === 'StorefrontIcon')
        iconElement = <StorefrontIcon fontSize="large"></StorefrontIcon>

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
                        {iconElement}
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
    key: string,
    title: string,
    icon: string,
    value: number
}