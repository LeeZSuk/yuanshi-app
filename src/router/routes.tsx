import { lazy } from 'react';
import type { RoutesType } from './routes.type';
// import { userAuthCodeMap } from '@/constants/auth/userAuth.util';
// import { AUTH_CODE } from '@/constants/auth/authCode';

// pages
/**
 * 登录
 */
const Login = lazy(() => import('@/pages/Login'));
const Main = lazy(() => import('@/pages/Main'));
const List = lazy(() => import('@/pages/List'));
const routes: RoutesType[] = [
  {
    path: '/login',
    element: <Login />,
  },
    {
    path: '/',
    element: <Main />,
    meta: {
      access: ()=>localStorage.getItem('username')===null? false : true,
    },
    children: [
      {
        path: '/list',
        element: <List />,
      },
    
    ],
  },
];

export default routes;
