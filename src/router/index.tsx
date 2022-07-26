import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';
import ROUTES from './routes';

const LayoutPage = lazy(() => import(/* webpackChunkName: "FindPage" */ '@/layout/Layout'));
const DiscoverPage = lazy(() => import(/* webpackChunkName: "FindPage" */ '@/pages/Discover'));
const RecommendationPage = lazy(
    () => import(/* webpackChunkName: "FindPage" */ '@/pages/Discover/Recommendation'),
);

const SonglistPage = lazy(() => import(/* webpackChunkName: "FindPage" */ '@/pages/Songlist'));
const SonglistDetailPage = lazy(
    () => import(/* webpackChunkName: "FindPage" */ '@/pages/SonglistDetail'),
);

const routes: RouteConfig[] = [
    {
        path: ROUTES.ROOT,
        component: LayoutPage,
        routes: [
            {
                path: ROUTES.ROOT,
                exact: true,
                key: '/',
                render: () => {
                    return <Redirect to={ROUTES.DISCOVERY} />;
                },
            },
            {
                path: ROUTES.DISCOVERY,
                key: '1',
                component: DiscoverPage,
                routes: [
                    {
                        path: ROUTES.RECOMMENDATION,
                        key: '1',
                        exact: true,
                        component: RecommendationPage,
                    },
                    {
                        path: ROUTES.SONG_LIST,
                        key: 'songlist',
                        exact: true,
                        component: SonglistPage,
                    },
                    {
                        path: ROUTES.DISCOVERY,
                        key: '1',
                        exact: true,
                        component: RecommendationPage,
                    },
                ],
            },
            {
                path: ROUTES.SONG_LIST_DETAIL,
                key: 'songlist_detail',
                exact: true,
                component: SonglistDetailPage,
            },
        ],
    },
];
export default routes;
