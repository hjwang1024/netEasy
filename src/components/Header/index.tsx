import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import ROUTES from '@/router/routes';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import Navbar from './Navbar';
const Header: React.FC = () => {
    return (
        <div className={styles.homeHeader}>
            <Navbar></Navbar>
            <span>sd</span>
        </div>
    );
};

export default Header;
