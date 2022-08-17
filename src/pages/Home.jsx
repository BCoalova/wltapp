import { Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import List from '../components/List'
import LoadingBackDrop from '../components/LoadingBackDrop'
import NoData from '../components/NoData'
import { useGlobalContext } from '../context/GlobalContext'

export default function Home() {
    const { userData, isLoadingUserData } = useGlobalContext()

    const navigate = useNavigate()

    return (
        <Stack>
            {isLoadingUserData && <LoadingBackDrop onTop={false} isLoading={isLoadingUserData} />}
            {userData && !Object.keys(userData.list).length && <NoData />}
            {userData && !!Object.keys(userData.list).length && <List handleSelect={code => navigate(`/detalle/${code}`)} />}
        </Stack>
    )
}
