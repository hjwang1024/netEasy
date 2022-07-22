import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';
import ROUTES from './routes';

const LayoutPage = lazy(() => import(/* webpackChunkName: "FindPage" */ '@/layout/Layout'));
const DiscoverPage = lazy(() => import(/* webpackChunkName: "FindPage" */ '@/pages/Discover'));
const RecommendationPage = lazy(
    () => import(/* webpackChunkName: "FindPage" */ '@/pages/Discover/Recommendation'),
);

const routes: RouteConfig[] = [
    {
        path: ROUTES.ROOT,
        exact: true,
        render: () => {
            return <Redirect to={ROUTES.DISCOVERY} />;
        },
    },
    {
        path: ROUTES.DISCOVERY,
        component: LayoutPage,
        routes: [
            {
                path: ROUTES.DISCOVERY,
                key: 'discover',
                exact: true,
                component: DiscoverPage,
            },
            {
                path: ROUTES.RECOMMENDATION,
                key: 'recommendation',
                exact: true,
                component: RecommendationPage,
            },
            // {
            //     path: '/discover/recommendation',
            //     key: 'discover',
            //     exact: true,
            //     component: DiscoverPage,
            // },
        ],
    },
];
export default routes;
