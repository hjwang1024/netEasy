import React, { useEffect, useState } from 'react';
import { Icon } from '@blueprintjs/core';
import { useHistory, useLocation } from 'react-router-dom';
import PlayCount from '@@/PlayCount';
import PlayIcon from '@@/PlayIcon';
import ROUTES from '@/router/routes';
import styles from '../style.module.scss';
interface ISongListItem {
    id: number;
    name: string;
    playCount: number;
    picUrl?: string;
}
const routerTitle: React.FC<ISongListItem> = ({ id, name, playCount, picUrl }) => {
    const history = useHistory();
    const routerClick = () => {
        history.push(`${ROUTES.SONG_LISTS}/${id}`);
    };
    return (
        <div className={styles.songListItem} onClick={routerClick}>
            <span className={styles.imgItem}>
                <img src={picUrl} loading='lazy'></img>
                <PlayCount count={playCount} className={styles.playCount} />
                <PlayIcon className={styles.playIcon} />
            </span>
            <div className={styles.name}>{name}</div>
        </div>
    );
};
export default routerTitle;
