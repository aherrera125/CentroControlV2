import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Socios from "./components/Socios";
import SocioNuevo from "./components/SocioNuevo";
import TipoSocio from "./components/TipoSocio";
import Pagos from "./components/Pagos";
import ReportePagos from "./components/ReportePagos";
import ReporteSocios from "./components/ReporteSocios";
import Usuarios from "./components/Usuarios";
import AltaUsuarios from "./components/AltaUsuarios";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>          
          <Route path="/socios" element={<Socios />} /> 
          <Route path="/nuevo-socio" element={<SocioNuevo />} />
          <Route path="/tipo-socio" element={<TipoSocio />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/reporte-pagos" element={<ReportePagos />} />
          <Route path="/reporte-socios" element={<ReporteSocios />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/alta-usuarios" element={<AltaUsuarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
