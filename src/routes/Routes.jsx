import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../mainLayout/Root";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ExploreGardeners from "../components/ExploreGarden/ExploreGardeners";
import BrowsTips from "../components/BrowsTips/BrowsTips";
import ShareGardenTip from "../components/ShareTips/ShareGardenTip";
import PrivateRoutes from "./PrivateRoutes";
import MyTips from "../components/MyTips/MyTips";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import TipDetails from "../components/TipsDetails/TipDetails";
import UpdateTips from "../components/UpdateTips/UpdateTips";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "explore",
        loader: () => fetch("http://localhost:3000/activeGardener"),
        element: <ExploreGardeners />,
      },
      {
        path: "browse",
        element: <BrowsTips />,
      },
      {
        path: "/tip-details/:_id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/tip-details/${params._id}`),
        element: <TipDetails />,
      },
      {
        path: "/share-tip",
        element: (
          <PrivateRoutes>
            <ShareGardenTip />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-tips",
        element: (
          <PrivateRoutes>
            <MyTips />
          </PrivateRoutes>
        ),
      },
      {
        path: "/update-tips/:id",
        element: (
          <PrivateRoutes>
            <UpdateTips />
          </PrivateRoutes>
        ),
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/getTip/${params.id}`);
          if (!res.ok) {
            throw new Error("Tip not found");
          }
          return res.json();
        },
      },
    ],
  },
]);
