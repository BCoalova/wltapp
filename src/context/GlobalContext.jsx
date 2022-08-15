import { createContext, useContext, useEffect, useState } from 'react'
import useDarkMode from '../hooks/useDarkMode'

import { deleteField, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import initializeUser from '../helpers/initializeUser'
import useCurrentUser from '../hooks/useCurrentUser'
import useBoolean from '../hooks/useBoolean'

const GlobalContext = createContext()

const { Provider } = GlobalContext

export function useGlobalContext() {
    return useContext(GlobalContext)
}

export default function GlobalProvider({ children }) {
    const [isLight /* , makeDark, makeLight, toggle */] = useDarkMode()

    const [currentUser, loadingUser, login, logOut] = useCurrentUser()
    const [userData, setUserData] = useState(null)
    const [isLoadingUserData, finishLoadingUserData /* , startLoadingUserData */] = useBoolean(true)
    const [, /* saveExcerciseErr */ setSaveExcerciseErr] = useState('')
    const [loadingSaveExcercise, setLoadingSaveExcercise] = useState(false)

    useEffect(() => {
        if (!currentUser) return

        let document = doc(db, 'users', currentUser.uid)

        const unsub = onSnapshot(document, doc => {
            if (doc.data()) {
                setUserData(doc.data())
                // eslint-disable-next-line no-undef
                // console.log('doc.data() => ', doc.data())
            }
            if (!doc.data()) {
                let getUserData = initializeUser(currentUser)
                // eslint-disable-next-line no-undef
                ;(async function () {
                    try {
                        await setDoc(document, {
                            createdTime: serverTimestamp(),
                            ...getUserData,
                        })
                        setUserData(getUserData)
                    } catch (err) {
                        // eslint-disable-next-line no-undef
                        console.log('err get data when none existed => ', err)
                    }
                })()
                // eslint-disable-next-line no-undef
                console.log('no existe')
            }

            finishLoadingUserData()
        })

        return () => unsub()
    }, [currentUser, finishLoadingUserData])

    const saveExcercise = async (data, excerciseCode) => {
        setLoadingSaveExcercise(true)

        let document = doc(db, 'users', currentUser.uid)
        let listDotExcercise = `list.${excerciseCode}`

        try {
            await updateDoc(document, {
                [listDotExcercise]: { ...data, createdAt: serverTimestamp() },
            })
        } catch (err) {
            setSaveExcerciseErr(err)
        } finally {
            setLoadingSaveExcercise(false)
        }
        // setLoadingSaveExcercise(false)
    }

    const [isLoadingDelete, stopLoadingDelete, startLoadingDelete /* , toggleLoadingDelete, resetLoadingDelete  */] = useBoolean()
    const [deleteError, setDeleteError] = useState('')

    const deleteExcercise = async id => {
        startLoadingDelete()

        let document = doc(db, 'users', currentUser.uid)
        let listDotExcercise = `list.${id}`

        try {
            await updateDoc(document, {
                [listDotExcercise]: deleteField(),
            })
        } catch (err) {
            setDeleteError(err)
        } finally {
            stopLoadingDelete()
        }
    }

    const value = {
        isLight,
        login,
        logOut,
        loadingUser,
        currentUser,

        userData,
        isLoadingUserData,
        saveExcercise,
        loadingSaveExcercise,

        deleteExcercise,
        isLoadingDelete,
        deleteError,
    }
    return <Provider value={value}>{children}</Provider>
}
