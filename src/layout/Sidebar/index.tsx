import React from 'react';
import styles from './style.module.scss';
import logoImg from '@/assets/images/logo.png';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
const Sidebar = () => {
    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.logo}>
                <img className={styles.logoImg} src={logoImg} alt='' />
                <div className={styles.routerArrows}>
                    <LeftOutlined />
                    <RightOutlined />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
