import { AppBar, Box, styled, Tab, Tabs, Toolbar, useMediaQuery } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import { links } from '../constants/links'

const StyledTab = styled(Tab)({
    indicator: {
        top: 0,
    },
})

export default function BottomNavigation() {
    const { currentUser } = useGlobalContext()
    const { pathname } = useLocation()
    const matches = useMediaQuery('(min-width:700px)')

    return (
        <AppBar position='fixed' color='text' sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                <Box sx={{ width: '100%' }}>
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
                </Box>
            </Toolbar>
        </AppBar>
    )
}
