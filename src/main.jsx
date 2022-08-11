import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes'
import GlobalProvider from './context/GlobalContext'
import './styles/styles.scss'

// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GlobalProvider>
            <App />
        </GlobalProvider>
    </React.StrictMode>,
)
