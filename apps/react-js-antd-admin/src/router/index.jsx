
import { Navigate, createHashRouter } from "react-router";

import { PUBLIC_ROUTE } from './sys';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

const Router = ()=>{
  const PROTECTED_ROUTE = {
    path: '/',
    element: <DashboardLayout />,
    children: [
      // 默认的重定向
      { index: true, element: <Navigate to={HOMEPAGE} replace /> },
      // 业务模块
      
    ],
  } 
  const routes = [PUBLIC_ROUTE, PROTECTED_ROUTE];
  const router = createHashRouter(routes);
  return <RouterProvider router={router} />;
}

export default Router