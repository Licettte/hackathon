import {Route, Routes} from "react-router-dom";

import {CabinetPage} from "./pages/cabinetPage/CabinetPage";
import {Layout} from "./pages/Layout";
import {LoginPage} from "./pages/LoginPage/LoginPage";

export default function App() {
  return (

    <Routes>
      <Route path={PageRoutes.LAYOUT} element={<Layout/>}>
        <Route index element={<LoginPage/>}/>
        <Route path={PageRoutes.CABINET} element={<CabinetPage/>}/>
        <Route path='*' element="Error" />
      </Route>
    </Routes>

  );
}

export enum PageRoutes {
  LAYOUT = '/',
  CABINET = '/cabinet',

}