import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Sermons from "./pages/Sermons";
import Events from "./pages/Events";
import Members from "./pages/Members";

function App() {
  return (
    <>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
         <Route path="/sermons" element={<Sermons />} />
        <Route path="/events" element={<Events />} />
        <Route path="/members" element={<Members />} />
      </Routes>

      <Toaster
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        reverseOrder={false}
      />
    </>
  );
}

export default App;
