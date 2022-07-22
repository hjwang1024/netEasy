import React, { useEffect, useState } from 'react';
import styles from '../style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState, globalAction } from '@/store';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import ROUTES from '@/router/routes';

import { Icon, IconName } from '@blueprintjs/core';
import { UserOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Modal, Input } from 'antd';
import { ILoginRequest, ILoginResult } from '@/apis/modules/types/user';
interface IMenuItem {
    icon: IconName;
    label: string;
    active?: boolean;
    route: string;
}

interface IMenu {
    title?: string;
    items: IMenuItem[];
}

const MENU: IMenu[] = [
    {
        items: [
            {
                icon: 'music',
                label: '发现音乐',
                route: ROUTES.DISCOVERY,
            },
            {
                icon: 'mobile-video',
                label: '视频',
                route: ROUTES.VIDEOS,
            },
        ],
    },
    {
        title: '我的音乐',
        items: [
            {
                icon: 'import',
                label: '下载管理',
                route: ROUTES.DOWNLOAD,
            },
            {
                icon: 'cloud',
                label: '我的音乐云盘',
                route: ROUTES.CLOUD,
            },
            {
                icon: 'star-empty',
                label: '我的收藏',
                route: ROUTES.COLLECTION,
            },
        ],
    },
];
const MenuTabs = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { pathname } = useLocation();
    const { userInfo } = useSelector((state: IStoreState) => ({
        userInfo: state.global.userInfo,
    }));

    useEffect(() => {
        if (userInfo) {
            // console.log(userInfo);
            //未登录
            // dispatch(globalAction.loginFun());
        }
    });
    const handleMenuItemClick = (route: string) => {
        history.push(route);
    };

    return (
        <>
            {MENU.map(({ title, items }, index) => {
                return (
                    <div className={styles.menuBlock} key={index}>
                        {title && <div className={styles.menuLabel}>{title}</div>}
                        <div className={styles.MenuTabs}>
                            {items.map(({ icon, label, route }) => {
                                const isActive = pathname.startsWith(route);
                                return (
                                    <div
                                        key={label}
                                        className={
                                            isActive
                                                ? cn(styles.menuTab, styles.menuActive)
                                                : styles.menuTab
                                        }
                                        onClick={() => handleMenuItemClick(route)}
                                    >
                                        <Icon icon={icon} />
                                        {label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default MenuTabs;
