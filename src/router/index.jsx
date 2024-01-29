import Month from "@/pages/Month";
import News from "@/pages/New";
import Year from "@/pages/Year";
import Layout from "@/pages/layout";
import { createBrowserRouter } from "react-router-dom";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "month",
        element: <Month />,
      },
      {
        path: "year",
        element: <Year />,
      },
    ],
  },
  {
    path: "/new",
    element: <News />,
  },
]);
