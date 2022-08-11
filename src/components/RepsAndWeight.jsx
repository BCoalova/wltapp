import AddBoxIcon from '@mui/icons-material/AddBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import {
    Chip,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material'

export default function RepsAndWeight({ serie, handleRemoveRep, handleAddRep, handleChangeWeight, handleChangeAddingFactor }) {
    const matches = useMediaQuery('(min-width:600px)')
    const matchesSmaller = useMediaQuery('(min-width:427px)')

    return (
        <Stack direction={matches ? 'row' : 'column'} gap={1} alignItems='center'>
            <Stack
                direction={matchesSmaller ? 'row' : 'column'}
                alignItems={matchesSmaller ? 'center' : 'stretch'}
                gap={1}
                justifyContent='space-between'
                flexGrow={1}
                flexWrap='wrap'
                sx={{ p: 1, width: matches ? '' : '100%' }}
            >
                <Typography>Reps:</Typography>
                <Stack direction='row' gap={2} alignItems='center' flexWrap='wrap'>
                    <Stack direction='row' gap={1} alignItems='center'>
                        {[
                            { value: '1x', id: 0, addingFactor: 1 },
                            { value: '5x', id: 1, addingFactor: 5 },
                            { value: '10x', id: 2, addingFactor: 10 },
                        ].map(el => (
                            <Chip
                                key={el.value}
                                label={el.value}
                                variant='outlined'
                                color={el.addingFactor === serie.addingFactor ? 'primary' : 'default'}
                                onClick={() => handleChangeAddingFactor(serie.id, el.addingFactor)}
                            />
                        ))}
                    </Stack>
                    <Stack direction='row' gap={1} alignItems='center'>
                        <IconButton
                            disabled={serie.reps === 0}
                            size='small'
                            aria-label='Remover Rep'
                            onClick={() => handleRemoveRep(serie.id)}
                        >
                            <IndeterminateCheckBoxIcon />
                        </IconButton>
                        <Chip label={serie.reps} variant='outlined' color='primary' />
                        <IconButton size='small' aria-label='Agregar Rep' onClick={() => handleAddRep(serie.id)}>
                            <AddBoxIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </Stack>
            {matches && <Divider orientation='vertical' flexItem />}

            <Stack width={matches ? '20%' : '100%'}>
                <FormControl ariant='outlined' size='small'>
                    <InputLabel htmlFor='outlined-adornment-password'>Peso</InputLabel>
                    <OutlinedInput
                        type='number'
                        value={serie.weight}
                        onChange={e => handleChangeWeight(e, serie.id)}
                        label='Peso'
                        id='outlined-adornment-weight'
                        endAdornment={<InputAdornment position='end'>kg</InputAdornment>}
                        aria-describedby='outlined-weight-helper-text'
                    />
                </FormControl>
            </Stack>
        </Stack>
    )
}
