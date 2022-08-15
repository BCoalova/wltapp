import { Navigate } from 'react-router-dom'
import LoadingBackDrop from '../components/LoadingBackDrop'
import { useGlobalContext } from '../context/GlobalContext'

export default function PrivateRoute({ children }) {
    const { currentUser, loadingUser } = useGlobalContext()

    if (loadingUser) return <LoadingBackDrop onTop={true} isLoading={loadingUser} />

    return currentUser ? children : <Navigate to='/login' replace={true} />
}
