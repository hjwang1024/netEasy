import React, { useEffect, useState } from 'react';
import styles from '../style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState, globalAction } from '@/store';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';
import axios from '@/apis';
import { ISonglist } from '@/apis/modules/types/business';

import { Icon, IconName } from '@blueprintjs/core';
import { UserOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Modal, Input } from 'antd';
import { ILoginRequest, ILoginResult } from '@/apis/modules/types/user';
import { getUserSonglist } from '@/apis/modules/songList';

const SongList = () => {
    const { userInfo } = useSelector((state: IStoreState) => ({
        userInfo: state.global.userInfo,
    }));
    const { pathname } = useLocation();
    const uid = userInfo?.profile.userId;
    const [createSongList, setCreateSongList] = useState<ISonglist[]>([]);
    const [collectSongList, setCollectSongList] = useState<ISonglist[]>([]);
    useEffect(() => {
        if (userInfo) {
            getSonglist();
        }
    }, [userInfo]);

    const getSonglist = async () => {
        const res = await axios.getUserSonglist(userInfo?.profile.userId);
        console.log(res);
        const playlist: ISonglist[] = res.playlist || [];
        setCreateSongList(playlist.filter(({ creator }) => uid === creator.userId));
        setCollectSongList(playlist.filter(({ creator }) => uid !== creator.userId));
    };
    return (
        <>
            {createSongList && <SongItem title='创建的歌单' data={createSongList}></SongItem>}
            {collectSongList && <SongItem title='收藏的歌单' data={collectSongList}></SongItem>}
        </>
    );
};
interface ISongs {
    title: string;
    data?: ISonglist[];
}
const SongItem: React.FC<ISongs> = ({ title, data }) => {
    const { userInfo } = useSelector((state: IStoreState) => ({
        userInfo: state.global.userInfo,
    }));
    const history = useHistory();
    const routeMatch = useRouteMatch<{ songlistId: string }>('/songlists/:songlistId');
    const handleClick = (id: number) => history.push(`/songlists/${id}`);
    return (
        <div className={styles.songListContainer}>
            <div className={styles.songListTitle}>{title}</div>
            <div>
                {data?.map(({ id, name, trackCount }) => {
                    const isActive = routeMatch && Number(routeMatch.params.songlistId) === id;
                    const text = `${name}（${trackCount}首）`;
                    return (
                        <div
                            key={id}
                            title={text}
                            className={cn(styles.songListItem, isActive && styles.menuActive)}
                            onClick={() => handleClick(id)}
                        >
                            {text}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SongList;
