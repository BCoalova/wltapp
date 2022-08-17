import { Box, IconButton, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import HistoryList from '../components/HistoryList'
import List from '../components/List'
import LoadingBackDrop from '../components/LoadingBackDrop'
import NoData from '../components/NoData'
import { useGlobalContext } from '../context/GlobalContext'
import setUpHistoryArr from '../helpers/setUpHistoryArr'
import CloseIcon from '@mui/icons-material/Close'
export default function History() {
    const { userData, isLoadingUserData } = useGlobalContext()

    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        if (!userData) return

        // eslint-disable-next-line no-undef
        // console.log('userData => ', userData)
    }, [userData])

    const handleSelect = code => {
        if (selectedId === code) return setSelectedId(null)

        return setSelectedId(code)
    }

    return (
        <Stack gap={2}>
            {isLoadingUserData && <LoadingBackDrop onTop={false} isLoading={isLoadingUserData} />}
            {userData && !Object.keys(userData.list).length && <NoData />}
            {userData && !!Object.keys(userData.list).length && <List handleSelect={handleSelect} />}
            {selectedId && (
                <Stack sx={{ position: 'relative' }}>
                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <IconButton onClick={() => setSelectedId(null)} aria-label='delete'>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <HistoryList list={setUpHistoryArr(userData.list[selectedId])} />
                </Stack>
            )}
        </Stack>
    )
}
