import { LoadingButton } from '@mui/lab'
import { Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import DeleteConfirmation from '../components/DeleteConfirmation'
import DetailsActions from '../components/DetailsActions'
import DetailsGrid from '../components/DetailsGrid'
import RepsAndWeight from '../components/RepsAndWeight'
import Series from '../components/Series'
import { useGlobalContext } from '../context/GlobalContext'
import { converTimeStampToFormatedDate } from '../helpers/timeStampToDate'
import useAdd from '../hooks/useAdd'
import useBoolean from '../hooks/useBoolean'

export default function DetailPage() {
    const { id } = useParams()
    const { userData, saveExcercise, loadingSaveExcercise } = useGlobalContext()

    const [series, useAddSerieFN, useAddRepFN, useAddWeightFN, handleSetUpSeries] = useAdd()
    const [handleAddSerie, handleRemoveSerie] = useAddSerieFN.useAddSerie
    const [handleAddRep, handleRemoveRep] = useAddRepFN.useAddRep
    const [handleChangeWeight, handleChangeAddingFactor] = useAddWeightFN.useAddWeight

    const [isShowAddNew, hideAddNew, showAddNew] = useBoolean(false)
    const [isShowEdit, hideEdit, showEdit] = useBoolean(false)
    const [isPromptDelete, hidePromptDelete, showPromptDelete] = useBoolean(false)

    const handleAddNew = async () => {
        const data = { ...userData.list[id] }

        data.history.push({
            series: data.series,
            date: data.createdAt,
        })
        delete data.createdAt
        data.history = data.history.map((h, idx) => ({ ...h, orderNum: idx }))
        data.series = series.map(s => ({ reps: s.reps, weight: s.weight, id: s.id }))

        await saveExcercise(data, id)

        hideAddNew()
    }

    const handleEdit = async () => {
        let newData = { ...userData }
        newData.list[id].series = series.map(serie => ({ weight: serie.weight, id: serie.id, reps: serie.reps }))
        const data = newData.list[id]
        delete data.createdAt

        await saveExcercise(data, id)

        hideEdit()
    }

    const handleShowEdit = () => {
        // eslint-disable-next-line no-undef
        console.log('userData.list[id].series => ', userData.list[id].series)
        handleSetUpSeries(userData.list[id].series.map(serie => ({ ...serie, addingFactor: 1 })))
        showEdit()
    }

    const handleCleanEdit = () => {
        handleSetUpSeries([{ reps: 0, weight: '', addingFactor: 1, id: 0 }])
        hideEdit()
    }

    const handlePromptDelete = () => {
        showPromptDelete()
    }

    const handleDelete = async id => {
        // eslint-disable-next-line no-undef
        console.log('id => ', id)
    }

    // useEffect(() => {
    //     if (!userData) return
    //     // eslint-disable-next-line no-undef
    //     console.log('userData => ', userData)
    // }, [userData])

    // return 'hi'

    return (
        userData && (
            <Stack gap={2}>
                <Paper elevation={isShowAddNew || isShowEdit ? 0 : 2}>
                    <Stack sx={{ py: 2, px: 3 }} gap={3}>
                        <Typography variant='h4'>{userData.list[id].name}</Typography>
                        <DetailsGrid userData={userData} id={id} />
                    </Stack>

                    <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ py: 2, px: 3 }} gap={2}>
                        <Typography>Fecha: </Typography>
                        <Typography>
                            {!loadingSaveExcercise && converTimeStampToFormatedDate(userData.list[id].createdAt)}
                        </Typography>
                    </Stack>

                    <Divider flexItem />
                    <DetailsActions
                        handleAddToHistory={showAddNew}
                        isShowAddNew={isShowAddNew}
                        handleShowEdit={handleShowEdit}
                        isShowEdit={isShowEdit}
                        handlePromptDelete={handlePromptDelete}
                    />
                </Paper>
                {(isShowAddNew || isShowEdit) && (
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
                                    onClick={() => (isShowAddNew ? hideAddNew() : handleCleanEdit())}
                                >
                                    Cancelar
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                )}
                {isPromptDelete && (
                    <DeleteConfirmation
                        isPromptDelete={isPromptDelete}
                        hidePromptDelete={hidePromptDelete}
                        id={id}
                        handleDelete={handleDelete}
                    />
                )}
            </Stack>
        )
    )
}
