import { Button, Paper, Stack, Typography } from '@mui/material'
import RepsAndWeight from './RepsAndWeight'
import Series from './Series'
import { LoadingButton } from '@mui/lab'

export default function EditOrAddExcercise({
    userData,
    series,
    handleRemoveSerie,
    handleAddSerie,
    handleAddRep,
    handleRemoveRep,
    handleChangeWeight,
    handleChangeAddingFactor,
    isShowAddNew,
    handleSetUpSeries,
    id,
    loadingSaveExcercise,
    handleAddNew,
    handleEdit,
    handleCleanNew,
    handleCleanEdit,
}) {
    return (
        <Paper>
            <Stack sx={{ py: 2, px: 3 }} gap={3}>
                <Typography variant='h4'>{userData.list[id].name}</Typography>
                <Series series={series} handleRemoveSerie={handleRemoveSerie} handleAddSerie={handleAddSerie} />
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
                <Stack direction='row' alignItems='center' alignSelf='flex-end' gap={2}>
                    {isShowAddNew && (
                        <Button
                            variant='contained'
                            onClick={() =>
                                handleSetUpSeries(userData.list[id].series.map(serie => ({ ...serie, addingFactor: 1 })))
                            }
                        >
                            Copiar
                        </Button>
                    )}
                    <LoadingButton
                        disabled={loadingSaveExcercise}
                        loading={loadingSaveExcercise}
                        variant='contained'
                        onClick={() => (isShowAddNew ? handleAddNew() : handleEdit())}
                    >
                        Guardar
                    </LoadingButton>
                    <Button
                        variant='outlined'
                        color='warning'
                        onClick={() => (isShowAddNew ? handleCleanNew() : handleCleanEdit())}
                    >
                        Cancelar
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    )
}
