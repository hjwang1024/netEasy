import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';

const LoginPage = lazy(() => import(/* webpackChunkName: "LoginPage" */ '../pages/Login'));

const HomePage = lazy(() => import(/* webpackChunkName: "FindPage" */ '../components/Home'));
const FindPage = lazy(() => import(/* webpackChunkName: "FindPage" */ '../pages/Find'));

const MyPage = lazy(() => import(/* webpackChunkName: "LoginPage" */ '../pages/My'));

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to='/home/find' />,
  },
  {
    path: '/login',
    key: 'login',
    component: LoginPage,
  },
  {
    component: HomePage,
    routes: [
      {
        path: '/home/find',
        key: 'find',
        exact: true,
        component: FindPage,
      },
      {
        path: '/home/my',
        key: 'my',
        component: MyPage,
      },
    ],
  },
];
export default routes;
