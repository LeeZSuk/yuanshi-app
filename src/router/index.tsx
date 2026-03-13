import { Navigate, createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import routes from './routes';
import PrivateRoute from './PrivateRoute';
import { RoutesType } from './routes.type';

/**
 * 递归遍历路由，将路由中的access属性转换为PrivateRoute组件
 */
function getRoutes(routes: RoutesType[]): RoutesType[] {
  return routes.map((route: RoutesType) => {
    if (route.meta && Object.prototype.hasOwnProperty.call(route.meta, 'access')) {
      const el = <PrivateRoute element={route.element} access={route.meta.access} />;
      if (el.props.element) {
        route.element = el;
      }
    }
    if (route.children && route.children.length) {
      if (route.meta?.access === false) {
        return {
          ...route,
          element: <Navigate to="/login" replace={true} />,
        };
      }
      return {
        ...route,
        children: getRoutes(route.children),
      };
    }
    return route;
  });
}

const router = createBrowserRouter(getRoutes(routes) as RouteObject[]);

export default router;
