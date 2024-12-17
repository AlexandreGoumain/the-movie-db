import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import "./index.css";
import MainRouter from "./MainRouter.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Navbar />
        <MainRouter />
    </BrowserRouter>
);
