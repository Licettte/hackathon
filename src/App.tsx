import {LoginPage} from "./pages/LoginPage/LoginPage";
import {Layout} from "./pages/Layout";
import {CabinetPage} from "./pages/cabinetPage/CabinetPage";
import {Route, Routes} from "react-router-dom";
import {FrostGlassMotion} from "@/Test";
import {FrostTextureCard} from "@/Test2";
import {GlassBankCard} from "@/Test3";

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