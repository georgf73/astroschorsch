import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Aufnahmen from "./pages/Aufnahmen";
import ForgotPassword from "./pages/ForgotPassword";
import CreateImage from "./pages/CreateImage";
import Objects from "./pages/Objects";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";
import './App.scss'

function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/objects" element={<Objects />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/aufnahmen" element={<Aufnahmen />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-image" element={<CreateImage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
