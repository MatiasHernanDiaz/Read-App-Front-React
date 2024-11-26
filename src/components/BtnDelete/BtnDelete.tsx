import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

export type propsBtnDelete = {
    title:string,
    btnTitle: string,
    description: string,
    icon?: React.ReactNode
    setAction: () => Promise<void>,
}

export default function AlertDialog(input : propsBtnDelete) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const action = () => {
        input.setAction()
        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" color="error" onClick={handleClickOpen}>
                {input.icon || input.btnTitle} {/* Muestra icono sise define , sino texto */}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{input.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {input.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined'
                    sx={{backgroundColor:'#aaa',color:'white', borderBlockColor:'#aaa'}}>
                        Cancelar
                    </Button>
                    <Button onClick={action} variant='contained' autoFocus 
                    sx={{backgroundColor:'#F25D0B'}}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
