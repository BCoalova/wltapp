import AddBoxIcon from '@mui/icons-material/AddBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import { Chip, IconButton, Stack, Typography } from '@mui/material'
import romanize from '../helpers/romanize'

export default function Series({ series, handleRemoveSerie, handleAddSerie }) {
    return (
        <Stack direction='row' gap={1} alignItems='center' justifyContent='space-between' p={1}>
            <Typography>Series: </Typography>
            <Stack direction='row' alignItems='center' gap={1} justifyContent='center'>
                <IconButton size='small' aria-label='Remover serie' onClick={handleRemoveSerie} disabled={series.length === 1}>
                    <IndeterminateCheckBoxIcon />
                </IconButton>
                <Stack alignItems='center' justifyContent='center'>
                    <Chip label={romanize(series.length)} variant='outlined' color='primary' />
                </Stack>
                <IconButton size='small' aria-label='Agregar serie' onClick={handleAddSerie}>
                    <AddBoxIcon />
                </IconButton>
            </Stack>
        </Stack>
    )
}
