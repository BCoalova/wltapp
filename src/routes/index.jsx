import { useGlobalContext } from '../context/GlobalContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { themeDark, themeLight } from '../styles/theme'
import PrivateRoute from './utils'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Add from '../pages/Add'
import List from '../pages/List'
import DetailPage from '../pages/DetailPage'
import Layout from '../components/Layout'

export default function App() {
    const { isLight } = useGlobalContext()

    return (
        <ThemeProvider theme={isLight ? themeLight : themeDark}>
            <BrowserRouter basename='/wltapp'>
                <Layout>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/agregar'
                            element={
                                <PrivateRoute>
                                    <Add />
                                </PrivateRoute>
                            }
                        />
                        <Route path='/lista'>
                            <Route
                                index
                                element={
                                    <PrivateRoute>
                                        <List />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path=':id'
                                element={
                                    <PrivateRoute>
                                        <DetailPage />
                                    </PrivateRoute>
                                }
                            />
                        </Route>
                        <Route
                            path='/perfil'
                            element={
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            }
                        />
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    )
}
