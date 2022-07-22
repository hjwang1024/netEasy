import React, { useEffect, useState } from 'react';
import { Icon } from '@blueprintjs/core';
import { useHistory, useLocation } from 'react-router-dom';

import styles from '../style.module.scss';
interface IRoute {
    title: string;
    path: string;
}
const routerTitle: React.FC<IRoute> = ({ title, path }) => {
    const history = useHistory();
    const routerClick = () => {
        history.push(path);
    };
    return (
        <>
            <span className={styles.routerTitle}>
                <span onClick={() => routerClick()}>{title}</span>
                <Icon onClick={() => routerClick()} icon='chevron-right' iconSize={18} />
            </span>
        </>
    );
};
export default routerTitle;
