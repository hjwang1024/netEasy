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
import { ISong } from '@/apis/modules/types/personalized';
import { actions } from '@@/Player/store';

interface ISongListDetail {
    detail: ISonglist;
    songs: Array<ISong>;
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
    const {
        changeFullScreenAction,
        changePlayingStatusAction,
        changeShowPlayListAction,
        changeCurrentIndexAction,
        changeCurrentSongAction,
        deleteSongAction,
        changePlayListAction,
    } = actions;
    const params = useParams<IDictionary<string>>();
    const { songlistId } = params;
    const [songListDetail, setSongListDetail] = useState<ISongListDetail>();
    const dispatch = useDispatch();

    useEffect(() => {
        getSongListDetail();
    }, [songlistId]);
    const getSongListDetail = async () => {
        const songListDetail1 = await axios.getSonglistDetail(songlistId);
        const songListDetail2 = await axios.getSonglistAllMusic(songlistId);
        setSongListDetail({
            detail: songListDetail1.playlist,
            songs: songListDetail2.songs.map((item: any) => {
                return {
                    id: item.id,
                    name: item.name,
                    album: item.al,
                    singers: item.ar,
                    dt: item.dt / 1000,
                };
            }),
        });
    };
    const playAll = (autoPlay?: boolean) => {
        const list = songListDetail?.songs;
        console.log(list);

        dispatch(changePlayListAction(list!));

        if (autoPlay) {
            dispatch(changeCurrentIndexAction(0));
        }
        dispatch(changePlayingStatusAction(true));
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
