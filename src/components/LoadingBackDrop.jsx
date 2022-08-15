import { Backdrop, CircularProgress } from '@mui/material'

export default function LoadingBackDrop({ onTop = false, isLoading }) {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: theme => (onTop ? theme.zIndex.drawer + 1 : 0) }} open={isLoading}>
            <CircularProgress color='inherit' />
        </Backdrop>
    )
}
