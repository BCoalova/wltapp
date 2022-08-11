import { AppBar, Box, IconButton, Stack, styled, Tab, Tabs, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import { links } from '../constants/links'
import { useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const StyledTab = styled(Tab)({
    indicator: {
        top: 0,
    },
})

export default function BottomNavigation() {
    const { currentUser } = useGlobalContext()
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const matches = useMediaQuery('(min-width:700px)')

    useEffect(() => {
        // eslint-disable-next-line no-undef
        console.log('pathname => ', pathname)

        let pathArr = pathname.split('/').slice(-1)[0]
        // eslint-disable-next-line no-undef
        console.log('pathArr => ', pathArr)

        const isInList = links.find(link => link.path === pathname)

        // eslint-disable-next-line no-undef
        console.log('isInList => ', isInList)
    }, [pathname])

    return (
        <AppBar position='fixed' color='text' sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                <Box sx={{ width: '100%' }}>
                    {links.find(link => link.path === pathname) && (
                        <Tabs
                            aria-label='basic tabs example'
                            variant={/* matches ?  */ 'fullWidth' /*  : 'scrollable' */}
                            scrollButtons='auto'
                            centered={/* matches ?  */ true /*  : false */}
                            value={links.find(el => pathname === el.path)?.id /* || 999 */}
                            TabIndicatorProps={{ sx: { top: 0 } }}
                        >
                            {links.map(
                                el =>
                                    el.path && (
                                        <StyledTab
                                            component={NavLink}
                                            key={el.id}
                                            label={matches ? el.label : ''}
                                            id={el.id}
                                            to={el.path}
                                            icon={el.Icon(currentUser)}
                                        />
                                    ),
                            )}
                        </Tabs>
                    )}
                    {!links.find(link => link.path === pathname) && (
                        <Stack direction='row' alignItems='center'>
                            <IconButton onClick={() => navigate(-1)}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography flexGrow={1} textAlign='center' mr={5}>
                                {pathname.split('/').slice(-1)[0]}
                            </Typography>
                        </Stack>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
