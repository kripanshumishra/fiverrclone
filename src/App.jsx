// component imports
import Navbar from "./component/navbar/Navbar";
import Footer from "./component/footer/Footer";

// pages import
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import MyGigs from "./pages/myGigs/MyGigs";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Add from "./pages/gigform/Add";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
// import Test from "./pages/test"

// styles
import "./App.css";

// module imports
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  useLocation,
  useSearchParams,
  Navigate,
} from "react-router-dom";
import Success from "./pages/success/Success";
import Pay from "./pages/pay/Pay";
import { useContext } from "react";
import { authContext } from "./context/authProvider/authProvider";

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
  const PersistedUser = () => {
    const location = useLocation();
    const authData = useContext(authContext)?.authData;
    let login = (authData?.username && authData?.username.length > 0) || false;
    if (!login) {
      let redirect_uri = "/login";
      if (location?.pathname && location.pathname.length > 0) {
        redirect_uri += "?redirect=" + location.pathname;
      }
      return <Navigate to={redirect_uri} />;
    }
    return <Layout />;
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
          path: "/gig/:id",
          element: <Gig />,
        },
      ],
    },

    {
      path: "/",
      element: <PersistedUser />,
      children: [
        {
          path: "/fu",
          element: <div>fun</div>,
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
          path: "/success",
          element: <Success />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/add",
          element: <Add />,
        },
      ],
    },

    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
