import { createBrowserRouter } from "react-router"
import { StarshipsPage } from "./pages/starships";
import { LoginPage } from "./pages/login";

export const router = createBrowserRouter([
  { path: "/", Component: StarshipsPage },
  { path: "/login", Component: LoginPage },
]);
