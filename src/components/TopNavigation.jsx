import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, IconButton, Snackbar, Stack, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import useBoolean from '../hooks/useBoolean'
import TopNavDrawer from './TopNavDrawer'

export default function TopNavigation() {
    const { logOut } = useGlobalContext()
    const [isDrawerOpen, closeDrawer, openDrawer] = useBoolean(false)
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
        <>
            <AppBar position='fixed'>
                <Toolbar>
                    <Stack sx={{ width: '100%' }} direction='row' justifyContent='space-between' alignItems='center' gap={2}>
                        <Stack direction='row' alignItems='center' gap={1}>
                            <IconButton component={Link} to='/'>
                                <FitnessCenterIcon />
                            </IconButton>
                            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                                Weight Lift Tracker
                            </Typography>
                        </Stack>
                        <IconButton
                            onClick={openDrawer}
                            size='large'
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>
            <TopNavDrawer isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer} logOutHandler={logOutHandler} />
            <Snackbar open={!!error} autoHideDuration={6000} onClose={closeError} message={error} />
        </>
    )
}
