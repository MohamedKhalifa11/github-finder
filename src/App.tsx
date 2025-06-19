import { BrowserRouter } from "react-router";
import "./App.css";
import Routers from "./routes/Routers";

function App() {
  return (
    <BrowserRouter>
      {/* <Navigation /> */}
      <Routers />
    </BrowserRouter>
  );
}

export default App;
