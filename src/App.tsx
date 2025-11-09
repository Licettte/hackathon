// App.tsx
import { Route, Routes } from 'react-router-dom';

import { CabinetPage } from 'pages/cabinetPage/CabinetPage';
import { Layout } from 'pages/Layout';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { OnboardingPage } from 'pages/onboardingPage/OnboardingPage';

export const PageRoutes = {
    LAYOUT: '/',
    CABINET: 'cabinet',
    ONBOARDING: 'onboarding',
} as const;

//todo lazy импорт. ток для автор.пользователей открыты пути, все кроме LoginPage
export default function App() {
    return (
        <Routes>
            <Route path={PageRoutes.LAYOUT} element={<Layout />}>
                <Route index element={<LoginPage />} />
                <Route path={PageRoutes.CABINET} element={<CabinetPage />} />
                <Route
                    path={PageRoutes.ONBOARDING}
                    element={<OnboardingPage />}
                />
                <Route path='*' element={<div>Not found</div>} />
            </Route>
        </Routes>
    );
}
