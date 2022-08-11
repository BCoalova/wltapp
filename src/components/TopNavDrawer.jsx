import LogoutIcon from '@mui/icons-material/Logout'
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { links } from '../constants/links'
import { useGlobalContext } from '../context/GlobalContext'

export default function TopNavDrawer({ isDrawerOpen, closeDrawer, logOutHandler }) {
    const { currentUser } = useGlobalContext()

    return (
        <Drawer open={isDrawerOpen} onClose={closeDrawer} anchor='right'>
            <List
                sx={{
                    width: '300px',
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    height: '100%',
                }}
            >
                <Box width='100%'>
                    {links.map(el => {
                        return (
                            <ListItem disablePadding key={el.id}>
                                <ListItemButton component={NavLink} to={el.path} onClick={closeDrawer}>
                                    <ListItemIcon>{el.Icon(currentUser)}</ListItemIcon>
                                    <ListItemText primary={el.label} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </Box>

                <Box width='100%'>
                    <Divider flexItem />
                    <ListItem disablePadding>
                        <ListItemButton onClick={logOutHandler}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary='Salir' />
                        </ListItemButton>
                    </ListItem>
                </Box>
            </List>
        </Drawer>
    )
}
