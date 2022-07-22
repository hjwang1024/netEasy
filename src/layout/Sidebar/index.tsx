import React from 'react';
import styles from './style.module.scss';
import logoImg from '@/assets/images/logo.png';
import LoginTab from './LoginTab';
import Menus from './Menus';
import SongList from './SongList';

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
            <div className={styles.menuContainer}>
                <LoginTab></LoginTab>
                <div className={styles.menus}>
                    <Menus></Menus>
                    <SongList></SongList>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
