import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import NotFound from "../pages/NotFound";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
