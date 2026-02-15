import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        
        <Route path="/" element={<Home />} />

        
        <Route path="/admin" element={<AdminDashboard />} />
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
