import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './style.module.scss';
import { renderRoutes } from 'react-router-config';
import ROUTES from '@/router/routes';
import Header from '@@/Header';
function Discover(props: any) {
    const route = props.route;
    return <>{route && renderRoutes(route.routes)}</>;
}

export default Discover;
