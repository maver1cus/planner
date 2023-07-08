import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {ROUTES} from "./routes";

const root = createRoot(document.getElementById("root"));
const router = createBrowserRouter(ROUTES);

root.render(<RouterProvider router={router} />);
