import { Paper, Stack, Typography } from '@mui/material'
import { converTimeStampToFormatedDateAndTime } from '../helpers/timeStampToDate'
import DetailsGrid from './DetailsGrid'

export default function HistoryList({ list }) {
    return (
        <Paper>
            <Stack py={2} px={3} gap={2}>
                <Typography variant='h4'>Histórico</Typography>

                {list.map(el => (
                    <>
                        <Typography>{converTimeStampToFormatedDateAndTime(el.createdAt)}</Typography>
                        <DetailsGrid key={el.id} series={el.series} />
                    </>
                ))}
            </Stack>
        </Paper>
    )
}
