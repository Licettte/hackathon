import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import OfflineApiDemo from './pages/OfflineApiDemo'
import './index.css'
import './pwa'
import {CabinetPage} from "./pages/cabinetPage/CabinetPage";

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/cabinet', element: <CabinetPage /> },//todo сделать lazy
  // { path: '/app/offline-api', element: <><App /><OfflineApiDemo /></> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)