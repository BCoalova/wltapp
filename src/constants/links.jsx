import HomeIcon from '@mui/icons-material/Home'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import { Box } from '@mui/material'

export const links = [
    { label: 'Inicio', Icon: () => <HomeIcon />, path: '/' },
    { label: 'Agregar', Icon: () => <PlaylistAddIcon />, path: '/agregar' },
    { label: 'Lista', Icon: () => <PlaylistPlayIcon />, path: '/lista' },
    {
        label: 'Perfil',
        Icon: currentUser => (
            <Box
                component='img'
                width={24}
                sx={{ borderRadius: '50%' }}
                alt={currentUser.displayName}
                src={currentUser.photoURL}
            />
        ),
        path: '/perfil',
    },
].map((el, index) => ({ ...el, id: index }))
