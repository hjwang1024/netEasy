import React, { Fragment } from 'react';
import { renderRoutes } from 'react-router-config';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

import styles from './style.module.scss';
const LayoutPage = (props: any) => {
    const route = props.route;
    return (
        <Fragment>
            <div className={styles.homeContainer}>
                <Sidebar />
                <div>{route && renderRoutes(route.routes)}</div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default LayoutPage;
