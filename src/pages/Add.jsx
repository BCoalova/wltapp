import { LoadingButton } from '@mui/lab'
import { Alert, Button, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import RepsAndWeight from '../components/RepsAndWeight'
import Series from '../components/Series'
import { useGlobalContext } from '../context/GlobalContext'
import useAdd from '../hooks/useAdd'
import useInput from '../hooks/useInput'

export default function Add() {
    const { currentUser, userData, saveExcercise, loadingSaveExcercise } = useGlobalContext()
    const [excercise, bindExcercise /* , handleResetSelect, handleUpdateSelect, checkIfEmptySelect */] = useInput('')
    const [series, useAddSerieFN, useAddRepFN, useAddWeightFN] = useAdd()
    const [handleAddSerie, handleRemoveSerie] = useAddSerieFN.useAddSerie
    const [handleAddRep, handleRemoveRep] = useAddRepFN.useAddRep
    const [handleChangeWeight, handleChangeAddingFactor] = useAddWeightFN.useAddWeight
    const navigate = useNavigate()

    const [isInDBErr, setIsInDBErr] = useState({})

    const handleSubtmi = async e => {
        e.preventDefault()
        setIsInDBErr('')

        let excerciseCode = excercise.replace(' ', '').toUpperCase()

        const isInDB = userData.list[excerciseCode]?.code === excerciseCode
        if (isInDB) {
            // eslint-disable-next-line no-undef
            console.log('isInDB => ', isInDB)
            return setIsInDBErr({ label: `El ejercicio ${excercise} ya está registrado.`, code: excerciseCode })
        }

        // const formatedDate = format(new Date(), 'dd/MM-YYYY')

        const data = {
            userID: currentUser.uid,
            series: series.map(s => ({ reps: s.reps, weight: s.weight, id: s.id })),
            name: excercise,
            code: excerciseCode,
            id: uuidv4(),
            history: [],
        }

        await saveExcercise(data, excerciseCode)

        navigate(`/lista/${excerciseCode}`)
    }

    return (
        <Stack gap={3}>
            <Typography variant='h4' component='h2'>
                Agregar
            </Typography>
            <Paper component='form' sx={{ py: 2, px: 3 }} elevation={3} onSubmit={handleSubtmi}>
                <Stack gap={2}>
                    <Stack sx={{ p: 1 }} elevation={0}>
                        <TextField size='small' variant='outlined' label='Ejercicio' {...bindExcercise} fullWidth />
                    </Stack>

                    <Series series={series} handleRemoveSerie={handleRemoveSerie} handleAddSerie={handleAddSerie} />

                    <Stack gap={1}>
                        {series.map(el => (
                            <RepsAndWeight
                                key={el.id}
                                serie={el}
                                handleAddRep={handleAddRep}
                                handleRemoveRep={handleRemoveRep}
                                handleChangeWeight={handleChangeWeight}
                                handleChangeAddingFactor={handleChangeAddingFactor}
                            />
                        ))}
                    </Stack>
                    <LoadingButton
                        loading={loadingSaveExcercise}
                        disabled={!excercise || loadingSaveExcercise}
                        variant='contained'
                        type='submit'
                    >
                        Guardar
                    </LoadingButton>
                </Stack>
            </Paper>
            <Snackbar
                open={Object.keys(isInDBErr).length !== 0}
                autoHideDuration={6000}
                onClose={() => setIsInDBErr('')}
                message={isInDBErr.label} /* action={action} */
            >
                <Alert
                    onClose={() => setIsInDBErr('')}
                    severity='warning'
                    sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
                >
                    {isInDBErr.label}
                    <Button component={Link} to={`../detalle/${isInDBErr.code}`}>
                        editar
                    </Button>
                </Alert>
            </Snackbar>
        </Stack>
    )
}
