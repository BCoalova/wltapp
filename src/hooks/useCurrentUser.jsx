import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth, googleSignIn } from '../firebase'
import useBoolean from './useBoolean'

export default function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState(null)
    const [loadingUser, loadingFalse /* , loadingTrue, loadingToggle, loadingReset */] = useBoolean(true)

    /* Log in user with gmail */
    const login = () => signInWithPopup(googleSignIn.auth, googleSignIn.googleProvider)

    /* Log out */
    const logOut = () => {
        setCurrentUser(null)
        signOut(googleSignIn.auth)
    }

    // eslint-disable-next-line no-undef
    // console.log('currentUser => ', currentUser)

    /* log in observer (triggers ) */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
            loadingFalse()
        })
        return () => {
            unsubscribe()
        }
    }, [loadingFalse])

    return [currentUser, loadingUser, login, logOut]
}
