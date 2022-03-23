import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login/login";
import { Home } from "./pages/home/home";
import { AuthContextProvider } from "./contexts/authContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
