import { Alert, Button, Stack } from '@mui/material'

export default function DetailsActions({ handleAddToHistory, isShowAddNew, handleShowEdit, isShowEdit }) {
    return (
        <Stack direction='row' alignItems='center' justifyContent='flex-end' gap={2} sx={{ py: 2, px: 3 }}>
            {(isShowAddNew || isShowEdit) && (
                <Alert severity={isShowEdit ? 'warning' : 'info'} sx={{ flexGrow: 1, pb: 0, pt: 0 }}>
                    {isShowAddNew && 'Está información se guardará en el historial.'}
                    {isShowEdit && 'Está información será remplazada por lo que se ingrese abajo.'}
                </Alert>
            )}
            <Button disabled={isShowEdit || isShowAddNew} variant='contained' color='primary' onClick={handleAddToHistory}>
                Nuevo
            </Button>
            <Button disabled={isShowEdit || isShowAddNew} variant='contained' onClick={handleShowEdit}>
                Editar
            </Button>
            <Button disabled={isShowEdit || isShowAddNew} variant='outlined' color='warning'>
                Eliminar
            </Button>
        </Stack>
    )
}
