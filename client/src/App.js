import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import AddRegistry from "./scenes/addRegistry";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import RegistryManagement from "./scenes/registryManagement";
import RegistryDetail from "./scenes/registryDetail";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormLogin from "./components/login/formlogin";
import Statistics from "./scenes/statistics";
import AccountManagement from "./scenes/accountManagement";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [display, setDisplay] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [location]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {display && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {display && <Topbar setIsSidebar={setIsSidebar} />}
            <ToastContainer
              theme="colored"
              position="top-center"
            ></ToastContainer>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/registryManagement"
                element={<RegistryManagement />}
              />
              <Route
                path="/registryManagement/:registryId"
                element={<RegistryDetail />}
              />
              <Route path="/addRegistry" element={<AddRegistry />} />
              <Route
                path="/accountManagement"
                element={<AccountManagement />}
              />
              <Route path="/line" element={<Line />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/login" element={<FormLogin />} />
              <Route path="/statistics" element={<Statistics />}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
