import React, { Fragment } from 'react';
import { renderRoutes } from 'react-router-config';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Header from '@@/Header';

import styles from './style.module.scss';
const LayoutPage = (props: any) => {
    const route = props.route;
    return (
        <Fragment>
            <div className={styles.homeContainer}>
                <Sidebar />
                <div className={styles.pageContainer}>
                    <Header></Header>
                    <div className={styles.layout}>
                        <div className={styles.routeContainer}>
                            {route && renderRoutes(route.routes)}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default LayoutPage;
