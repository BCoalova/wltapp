import styled from '@emotion/styled'
import { Badge, Box, Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import romanize from '../helpers/romanize'
import convertTimeStampToDate from '../helpers/timeStampToDate'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        bottom: 5,
        // transform: 'translateY(-50%)',
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 2px',
    },
}))

export default function DetailPage() {
    const { id } = useParams()
    const { userData } = useGlobalContext()

    if (!userData) {
        return 'loading...'
    }

    return (
        userData && (
            <Paper component={Stack} gap={2} sx={{ py: 2, px: 3 }}>
                <Typography variant='h4'>{userData.list[id].name}</Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: `1fr ${userData.list[id].series.map(() => 'auto').join(' ')}`,
                        columnGap: 1,
                        rowGap: 1.5,
                        alignItems: 'center',
                    }}
                >
                    <Typography>Series: </Typography>
                    {userData.list[id].series.map(serie => (
                        <Chip key={serie.id} label={romanize(serie.id + 1)} />
                    ))}
                    <Divider /* orientation='vertical' */ sx={{ gridColumn: '1 / -1' }} />
                    <Typography>Reps: </Typography>
                    {userData.list[id].series.map(serie => (
                        <Chip key={serie.id} label={serie.reps} />
                    ))}
                    <Divider /* orientation='vertical' */ sx={{ gridColumn: '1 / -1' }} />
                    <Typography>Peso: </Typography>
                    {userData.list[id].series.map(serie => (
                        <StyledBadge
                            key={serie.id}
                            badgeContent='kg'
                            color='primary'
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <Chip label={serie.weight} />
                        </StyledBadge>
                    ))}
                    <Divider /* orientation='vertical' */ sx={{ gridColumn: '1 / -1' }} />
                </Box>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography>Fecha: </Typography>
                    <Typography>{format(convertTimeStampToDate(userData.list[id].createdAt), 'dd/MM/yyyy')}</Typography>
                </Stack>
                <Stack direction='row' gap={1}>
                    <Button variant='contained' color='secondary'>
                        Cargar nuevo
                    </Button>
                    <Button variant='contained'>Editar</Button>
                    <Button variant='outlined' color='warning'>
                        Eliminar
                    </Button>
                </Stack>
            </Paper>
        )
    )
}
