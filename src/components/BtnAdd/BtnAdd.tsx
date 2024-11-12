import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

type PropsAddButton = {
    redirectTo: string;
}

export default function AddButton({ redirectTo }: PropsAddButton) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(redirectTo);
    };

    return (
        <Fab 
            color="primary" 
            aria-label="add" 
            onClick={handleClick}
            style={{
                position: 'fixed',
                bottom: '50px',
                right: '20px',
                zIndex: 1,
            }}
        >
            <AddIcon />
        </Fab>
    );
}
