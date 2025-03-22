// import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Menu from "./components/menu/Menu";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Posts from "./pages/Posts";
import Notes from "./pages/Notifications";
import Calendar from "./pages/Calendar";
import Charts from "./pages/Charts";
import Logs from "./pages/Logs";
import ToasterProvider from "./components/ToasterProvider";
import EditProfile from "./pages/EditProfile";
import User from "./pages/User";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Notification from "./pages/Notifications";
function App() {
  const Layout = () => {
    return (
      <>
        {/* Fixed Navbar */}
        <div className="fixed w-full top-0 left-0 z-50">
          <Navbar />
        </div>

        {/* Main content layout */}
        <div
          id="rootContainer"
          className="w-full p-4 m-0 overflow-visible min-h-screen flex justify-between"
        >
          <ToasterProvider />
          <ScrollRestoration />

          <div className="flex w-full">
            {/* Fixed Sidebar */}
            <div className="fixed xl:block xl:w-[250px] 2xl:w-[280px] 3xl:w-[300px] border-r-2 border-base-300 dark:border-slate-700 pr-4 xl:py-1 top-[96px] bottom-0 overflow-y-auto">
              <Menu />
            </div>

            {/* Main content area */}
            <div className="w-full  xl:py-2 pt-24 xl:pt-24 ml-[250px] xl:ml-[280px] 2xl:ml-[300px] overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/profile/edit",
          element: <EditProfile />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/posts",
          element: <Posts />,
        },
        {
          path: "/notification",
          element: <Notification />,
        },
        {
          path: "/notes",
          element: <Notes />,
        },
        {
          path: "/calendar",
          element: <Calendar />,
        },
        {
          path: "/charts",
          element: <Charts />,
        },
        {
          path: "/logs",
          element: <Logs />,
        },
      ],
      errorElement: <Error />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
