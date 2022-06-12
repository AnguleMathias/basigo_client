import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Lead from "./pages/Lead";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/leads" element={<Dashboard />} />
            <Route path="/leads/:id" element={<Lead />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
