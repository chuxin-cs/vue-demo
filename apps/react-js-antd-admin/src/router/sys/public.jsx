
import Login from '@/pages/sys/login';

/**
 * Public routes { 公共路由，不需要登录即可访问 }
 * @author chuxin
 */
export const PUBLIC_ROUTE = [
  {
    path: '/login',
    element: <Login />,
  }
];