import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './style.module.scss';
import { renderRoutes } from 'react-router-config';
import ROUTES from '@/router/routes';
import BasicInfo from './components/BasicInfo';
import axios from '@/apis';
import { useParams } from 'react-router-dom';
import { ISonglist } from '@/apis/modules/types/business';
import Tabs from '@@/Tabs';
import MusicList from '@@/MusicList';
import { IMusic } from '@/apis/modules/types/business';

interface ISongListDetail {
    detail: ISonglist;
    songs: Array<IMusic>;
}
const TABS = [
    {
        label: '歌曲列表',
        key: 'songlist',
    },
    {
        label: '评论',
        key: 'comment',
    },
];
function SonglistDetail(props: any) {
    const params = useParams<IDictionary<string>>();
    const { songlistId } = params;
    const [songListDetail, setSongListDetail] = useState<ISongListDetail>();

    useEffect(() => {
        getSongListDetail();
    }, [songlistId]);
    const getSongListDetail = async () => {
        const songListDetail1 = await axios.getSonglistDetail(songlistId);
        const songListDetail2 = await axios.getSonglistAllMusic(songlistId);
        setSongListDetail({
            detail: songListDetail1.playlist,
            songs: songListDetail2.songs,
        });
    };
    const playAll = () => {
        console.log('playAll');
    };
    return (
        <>
            <BasicInfo data={songListDetail?.detail} onPlayAll={playAll}></BasicInfo>
            <div className={styles.content}>
                <div className={styles.tabs}>
                    <Tabs tabs={TABS} />
                </div>
                <MusicList data={songListDetail?.songs} onPlayAll={playAll} />
            </div>
        </>
    );
}

export default SonglistDetail;
