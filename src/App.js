import "./App.css";
import Details from "./components/details";
import IssuesPage from "./components/main";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Outlet />
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
        element: <IssuesPage />,
      },
    ],
  },
  {
    path: "/issues/:id",
    element: <Details />,
  },

  {
    path: "*",
    element: <div>Page does not exist</div>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
