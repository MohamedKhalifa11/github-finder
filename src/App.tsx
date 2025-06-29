import { BrowserRouter } from "react-router";
import "./App.css";
import Routers from "./routes/Routers";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 transition-colors dark:bg-gray-900">
        <Navbar />
        <Routers />
      </div>
    </BrowserRouter>
  );
}

export default App;
