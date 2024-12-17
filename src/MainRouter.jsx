import { Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import DetailsMovie from "./Components/DetailsMovie.jsx";

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/movie/:id" element={<DetailsMovie />} />
        </Routes>
    );
};

export default MainRouter;
