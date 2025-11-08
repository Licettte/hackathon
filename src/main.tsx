import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from './app/store/store';
import { CabinetPage } from './pages/cabinetPage/CabinetPage';
import App from './App';

import './pwa';

// import OfflineApiDemo from './pages/OfflineApiDemo'
import './index.css';

const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/cabinet', element: <CabinetPage /> }, //todo сделать lazy
    // { path: '/app/offline-api', element: <><App /><OfflineApiDemo /></> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
