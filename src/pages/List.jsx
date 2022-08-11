import { ListItem, ListItemText, Paper, List as MUIList, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import PageviewIcon from '@mui/icons-material/Pageview'
import { Link } from 'react-router-dom'

export default function List() {
    const { userData } = useGlobalContext()
    const [excerciseList, setExcerciseListList] = useState([])

    useEffect(() => {
        if (!userData) return

        let list = { ...userData.list }
        let getExcerciseList = Object.values(list)
        if (!getExcerciseList.length) return

        // eslint-disable-next-line no-undef
        console.log('getExcerciseList => ', getExcerciseList)

        setExcerciseListList(getExcerciseList)
    }, [userData])

    return (
        userData && (
            <Paper>
                <MUIList>
                    {!!excerciseList.length &&
                        excerciseList.map(exc => (
                            <ListItem
                                key={exc.id}
                                secondaryAction={
                                    <IconButton edge='end' aria-label='delete' component={Link} to={`${exc.code}`}>
                                        <PageviewIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={exc.name} />
                            </ListItem>
                        ))}
                </MUIList>
            </Paper>
        )
    )
}
