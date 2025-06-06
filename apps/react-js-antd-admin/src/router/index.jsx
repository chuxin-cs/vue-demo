import { RouterProvider } from 'react-router/dom';
import { Navigate, createHashRouter } from 'react-router';

// hooks
import { usePermissionRoutes } from './hooks';

// components
import { PUBLIC_ROUTE } from './sys';
import DashboardLayout from '@/layouts/dashboard';
import ProtectedRoute from '@/router/components/ProtectedRoute';

// var
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

const Router = () => {
  const permissionRoutes = usePermissionRoutes();
  console.log(permissionRoutes, '=permissionRoutes=');
  //
  const PROTECTED_ROUTE = {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // 默认的重定向
      { index: true, element: <Navigate to={HOMEPAGE} replace /> },
      // 业务模块
      ...permissionRoutes,
    ],
  };
  const routes = [PUBLIC_ROUTE, PROTECTED_ROUTE];
  const router = createHashRouter(routes);
  return <RouterProvider router={router} />;
};

export default Router;
