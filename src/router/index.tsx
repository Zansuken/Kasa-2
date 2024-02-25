import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { Routes } from "./routes";
import HousingDetails from "../pages/HousingDetails";
import NotFound from "../pages/NotFound";
import About from "../pages/About";

const Router = createBrowserRouter([
  {
    path: Routes.HOME,
    Component: Home,
  },
  {
    path: Routes.HOUSING_DETAIL,
    Component: HousingDetails,
  },
  {
    path: Routes.NOT_FOUND,
    Component: NotFound,
  },
  {
    path: Routes.ABOUT,
    Component: About,
  },
]);

export default Router;
