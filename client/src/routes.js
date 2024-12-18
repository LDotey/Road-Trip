import App from "./components/App";
import ParkPage from "./components/ParkPage";
import ParkDetailPage from "./components/ParkDetailPage";
// import HikersList from "./HikersPage";
// import TrailCard from "./TrailsPage";

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
    ],
  },
];

export default routes;
