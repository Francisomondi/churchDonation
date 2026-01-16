import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

function App() {
  return (
  <>
    <Home />
    <Toaster
        position="top-center"
        autoClose={4000}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
  </>
);
}

export default App;
