import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { Button, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'

export default function NoData() {
    return (
        <Paper elevation={3} sx={{ py: 2, px: 3 }} component={Stack} gap={2}>
            <Typography variant='h4' component='h2'>
                No hay información 😓
            </Typography>
            <Box>
                <Button component={Link} variant='contained' to='/agregar' startIcon={<PlaylistAddIcon />}>
                    Agregar
                </Button>
            </Box>
        </Paper>
    )
}
