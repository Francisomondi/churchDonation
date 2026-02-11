import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

function App() {
  return (
  <>
    <Home />
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
