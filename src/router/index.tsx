import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';

const LoginPage = lazy(() => import(/* webpackChunkName: "LoginPage" */ '../pages/Login'));

const HomePage = lazy(() => import(/* webpackChunkName: "FindPage" */ '../components/Home'));
const FindPage = lazy(() => import(/* webpackChunkName: "FindPage" */ '../pages/Find'));

const MyPage = lazy(() => import(/* webpackChunkName: "LoginPage" */ '../pages/My'));
const LayoutPage = lazy(() => import(/* webpackChunkName: "FindPage" */ '../layout/Layout'));

const routes: RouteConfig[] = [
    {
        path: '/',
        exact: true,
        render: () => <Redirect to='/discover' />,
    },
    {
        path: '/discover',
        component: LayoutPage,
        routes: [
            {
                path: '/discover',
                key: 'discover',
                exact: true,
                component: FindPage,
            },
            {
                path: '/discover/recommendation',
                key: 'discover',
                exact: true,
                component: LoginPage,
            },
        ],
    },
];
export default routes;
