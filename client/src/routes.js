import App from "./components/App";
import ParkPage from "./components/ParkPage";
import ParkDetailPage from "./components/ParkDetailPage";
import HikersList from "./components/HikersPage";
import TrailCard from "./components/TrailsPage";
import HikerDetail from "./components/HikerDetail";
import CreateTrail from "./components/NewTrailForm";

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
        path: "/park/:id",
        element: <ParkDetailPage />,
      },
      {
        path: "/hikers",
        element: <HikersList />,
      },
      {
        path: "/hiker/:id",
        element: <HikerDetail />,
      },
      {
        path: "/trails",
        element: <TrailCard />,
      },
      {
        path: "/create-trail/:parkId",
        element: <CreateTrail />,
      },
    ],
  },
];

export default routes;
