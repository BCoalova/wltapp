import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Stack,
    Slide,
} from '@mui/material'
import { useEffect, useRef } from 'react'
import * as React from 'react'
import useInput from '../hooks/useInput'
import useBoolean from '../hooks/useBoolean'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />
})

export default function DeleteConfirmation({ isPromptDelete, hidePromptDelete, id, deleteExcercise, isLoadingDelete }) {
    const textFieldRef = useRef()
    const [value, bind /* , handleReset, handleUpdate, checkIfEmpty */] = useInput('')
    const [isCorrect, incorrect, correct] = useBoolean(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isPromptDelete) return
        // eslint-disable-next-line no-undef
        setTimeout(() => {
            textFieldRef.current.focus()
        }, 300)
    }, [isPromptDelete])

    const checkEquality = async (value, id) => {
        const noSpacesValue = value.replaceAll(' ', '').toUpperCase()
        const isEqual = noSpacesValue === id

        if (!isEqual) return incorrect()

        correct()
        await deleteExcercise(id)
        navigate('/')
    }

    return (
        <Dialog TransitionComponent={Transition} open={isPromptDelete} onClose={hidePromptDelete}>
            <DialogTitle>¿Estás seguro que queres eliminarlo?</DialogTitle>
            <DialogContent>
                <DialogContentText>Se eliminará todo registro del ejercicio, incluyendo el histórico.</DialogContentText>
                <DialogContentText>
                    Por favor completá <b>{id}</b> para confirmar.
                </DialogContentText>
                <TextField
                    {...bind}
                    margin='dense'
                    id='name'
                    label='Código'
                    type='text'
                    fullWidth
                    variant='standard'
                    inputProps={{ ref: textFieldRef }}
                    helperText={!isCorrect ? 'Código incorrecto.' : ' '}
                    error={!isCorrect}
                />
            </DialogContent>
            <DialogActions>
                <Stack px={2} direction='row' alignItems='center' gap={1}>
                    <LoadingButton
                        loading={isLoadingDelete}
                        disabled={isLoadingDelete}
                        onClick={() => checkEquality(value, id)}
                        variant='contained'
                    >
                        Confirmar
                    </LoadingButton>
                    <Button onClick={hidePromptDelete} disabled={isLoadingDelete} color='warning' variant='outlined'>
                        Cancelar
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    )
}
