// component imports
import Navbar from "./component/navbar/Navbar";
import Footer from "./component/footer/Footer";

// pages import
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs"
import Gig from "./pages/gig/Gig"
import MyGigs from "./pages/myGigs/MyGigs"
import Orders from "./pages/orders/Orders"
import Messages from "./pages/messages/Messages"
import Message from "./pages/message/Message"
import Add from "./pages/add/Add"
import Register from "./pages/register/Register"
import Login from "./pages/login/Login"

// styles
import "./App.css";

// module imports
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";


function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
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
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App;
