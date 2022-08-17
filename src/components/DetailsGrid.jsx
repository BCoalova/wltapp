import styled from '@emotion/styled'
import { Badge, Box, Chip, Divider, Typography } from '@mui/material'
import romanize from '../helpers/romanize'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        bottom: 5,
        border: `1px solid ${theme.palette.background.paper}`,
        padding: '0 2px',
    },
}))

export default function DetailsGrid({ series }) {
    // eslint-disable-next-line no-undef
    // console.log('series => ', series)

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: `1fr ${series.map(() => 'auto').join(' ')}`,
                columnGap: 1,
                rowGap: 1,
                alignItems: 'center',
            }}
        >
            <Typography>Series: </Typography>
            {series.map(serie => (
                <Chip key={serie.id} label={romanize(serie.id + 1)} color='secondary' />
            ))}
            <Divider /* orientation='vertical' */ sx={{ gridColumn: '1 / -1' }} />
            <Typography>Reps: </Typography>
            {series.map(serie => (
                <Chip key={serie.id} label={serie.reps} variant='outlined' color='primary' />
            ))}
            <Divider /* orientation='vertical' */ sx={{ gridColumn: '1 / -1' }} />
            <Typography>Peso: </Typography>
            {series.map(serie => (
                <StyledBadge
                    sx={{ '& .MuiBadge-badge': { right: serie.weight && serie.weight > 9 ? 0 : 8 } }}
                    key={serie.id}
                    badgeContent='kg'
                    color='primary'
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Chip label={serie.weight || 0} />
                </StyledBadge>
            ))}
            <Divider /* orientation='vertical' */ sx={{ gridColumn: '1 / -1' }} />
        </Box>
    )
}
