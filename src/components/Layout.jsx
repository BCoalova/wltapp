import { Stack, Paper, Container } from '@mui/material'
import { useGlobalContext } from '../context/GlobalContext'
import BottomNavigation from './BottomNavigation'
import TopNavigation from './TopNavigation'

const layoutStyles = {
    minHeight: '100vh',
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
}

export default function Layout({ children }) {
    const { currentUser } = useGlobalContext()

    return (
        <Paper component={Stack} elevation={0} sx={layoutStyles}>
            {currentUser && (
                <>
                    <TopNavigation />
                    <BottomNavigation />
                </>
            )}

            <Container
                maxWidth={currentUser ? 'xxl' : false}
                sx={{ flexGrow: currentUser ? 1 : 0, py: currentUser ? 10 : 0 }}
                disableGutters={!currentUser}
            >
                {children}
            </Container>
        </Paper>
    )
}
