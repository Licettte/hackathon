import {LoginCard} from "./pages/loginCard/LoginCard";
import {Layout} from "./pages/Layout";
import {CabinetPage} from "./pages/cabinetPage/CabinetPage";
import {Route, Routes} from "react-router-dom";
import {SberMatteCard,} from "@/BB";
import {FrostGlassMotion} from "@/Test";
import {FrostTextureCard} from "@/Test2";
import {GlassBankCard} from "@/Test3";

export default function App() {
  return (

    <Routes>
      <Route path={PageRoutes.LAYOUT} element={<Layout/>}>
        {/*<Route index element={<LoginCard/>}/>*/}
        <Route index element={<SberMatteCard/>}/>
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