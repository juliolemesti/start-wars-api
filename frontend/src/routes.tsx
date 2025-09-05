import { createBrowserRouter, Navigate, RouterProvider, type AwaitProps } from "react-router"
import { StarshipsPage } from "./pages/starships";
import { LoginPage } from "./pages/login";
import App from "./App";
import { useAuthContext } from "./context/AuthContext";

export const ApplicationRouterProvider = () => {
  const { isAuthenticated } = useAuthContext()

  console.log('ApplicationRouterProvider isAuthenticated', isAuthenticated)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Navigate to={isAuthenticated ? "/starships" : "/login"} replace />
        },
        {
          path: "/login",
          element: isAuthenticated ? <Navigate to="/starships" replace /> : <LoginPage />
        },
        {
          path: "/starships",
          element: isAuthenticated ? <StarshipsPage /> : <Navigate to="/login" replace />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}
