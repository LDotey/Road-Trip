import App from "./components/App";
import ParkPage from "./components/ParkPage";
import ParkDetailPage from "./components/ParkDetailPage";
import HikersList from "./components/HikersPage";
import TrailCard from "./components/TrailsPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/parks",
        element: <ParkPage />,
      },
      {
        path: "/parks/:id",
        element: <ParkDetailPage />,
      },
      {
        path: "/hikers",
        element: <HikersList />,
      },
      {
        path: "/trails",
        element: <TrailCard />,
      },
    ],
  },
];

export default routes;
