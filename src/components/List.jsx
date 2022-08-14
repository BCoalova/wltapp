import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputBase, List as MUIList, ListItem, ListItemButton, ListItemText, Paper, styled } from '@mui/material'
import { Stack } from '@mui/system'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import useFilter from '../hooks/useFilter'

const CoolScrollBarPaper = styled(Paper)(({ theme }) => {
    // eslint-disable-next-line no-undef
    // console.log('theme => ', theme)s

    return {
        scrollbarColor: { background: theme.palette.primary.light },
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': { width: '12px' },
        '&::-webkit-scrollbar-track': { background: theme.palette.primary.light },
        '&::-webkit-scrollbar-thumb': { background: theme.palette.secondary.light },
        '&::-webkit-scrollbar-thumb:hover': { background: theme.palette.primary.light },
        '&::-webkit-scrollbar-thumb:active': { background: theme.palette.primary.light },
    }
})

export default function List() {
    const { userData } = useGlobalContext()
    const [excerciseList, setExcerciseListList] = useState([])

    const [bind, results /* , reset */] = useFilter(excerciseList, ['name'])

    useEffect(() => {
        if (!userData) return

        let list = { ...userData.list }
        let getExcerciseList = Object.values(list)
        if (!getExcerciseList.length) return

        setExcerciseListList(getExcerciseList)
    }, [userData])

    return (
        userData && (
            <CoolScrollBarPaper sx={{ py: 2, px: 3, maxHeight: 420, overflow: 'auto' }}>
                <Stack direction='row' component='form' onSubmit={e => e.preventDefault()}>
                    <InputBase fullWidth size='small' placeholder='Buscar' {...bind} />
                    <IconButton sx={{ p: '10px' }} aria-label='search'>
                        <SearchIcon />
                    </IconButton>
                </Stack>
                <MUIList>
                    {!!results.length &&
                        results.map(exc => (
                            <ListItem key={exc.id} disablePadding>
                                <ListItemButton component={Link} to={`/detalle/${exc.code}`}>
                                    <ListItemText primary={exc.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                </MUIList>
            </CoolScrollBarPaper>
        )
    )
}
