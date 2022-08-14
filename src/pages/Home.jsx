import { Stack } from '@mui/material'
import NoData from '../components/NoData'
import { useGlobalContext } from '../context/GlobalContext'
import List from '../components/List'

export default function Home() {
    const { userData } = useGlobalContext()

    return (
        <Stack>
            {userData && !Object.keys(userData.list).length && <NoData />}
            {userData && !!Object.keys(userData.list).length && <List />}
        </Stack>
    )
}
