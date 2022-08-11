import { useGlobalContext } from '../context/GlobalContext'
import { Typography, Paper, Box, Stack, Button, Snackbar } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useState } from 'react'

export default function Profile() {
    const { currentUser, logOut } = useGlobalContext()

    const [error, setError] = useState('')

    async function logOutHandler() {
        try {
            logOut()
        } catch (err) {
            setError('Ups.. hubo un problema al intentar cerrar la sesión, vuelve a intentarlo más tarde')
        }
    }

    function closeError() {
        setError('')
    }

    return (
        <Paper sx={{ px: 3, py: 2 }} component={Stack} direction='row' gap={2} alignItems='center' elevation={3}>
            <Box
                component='img'
                width={40}
                sx={{ borderRadius: '50%' }}
                alt={currentUser.displayName}
                src={currentUser.photoURL}
            />
            <Stack gap={1}>
                <Typography>Nombre: {currentUser.displayName}</Typography>
                <Typography>Email: {currentUser.email}</Typography>
                <Box>
                    <Button variant='outlined' startIcon={<LogoutIcon />} onClick={logOutHandler}>
                        Salir
                    </Button>
                </Box>
            </Stack>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={closeError} message={error} />
        </Paper>
    )
}
