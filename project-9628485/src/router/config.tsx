import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ModelWorks from "../pages/model-works/page";
import FilmPhotography from "../pages/film-photography/page";
import Photography from "../pages/photography/page";
import ProjectDetail from "../pages/project-detail/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/model-works",
    element: <ModelWorks />,
  },
  {
    path: "/film-photography",
    element: <FilmPhotography />,
  },
  {
    path: "/photography",
    element: <Photography />,
  },
  {
    path: "/project/:id",
    element: <ProjectDetail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
