import React, { useEffect, useState } from 'react';
import { ISonglist } from '@/apis/modules/types/business';
import ROUTES from '@/router/routes';
import styles from '../style.module.scss';
import RouterTitle from '../components/routerTitle';
import axios from '@/apis';
import SongList from '@@/SongList';

const RecommendPlaylist = () => {
    const [recommendSonglist, setRecommendSonglist] = useState<ISonglist[]>([]);
    const getRecommendSonglist = async () => {
        const res = await axios.getRecommendSonglist({ limit: 10 });
        setRecommendSonglist(res.result || []);
    };
    useEffect(() => {
        getRecommendSonglist();
    }, []);
    return (
        <>
            <RouterTitle title='推荐歌单' path={ROUTES.SONG_LIST}></RouterTitle>
            <div className={styles.songList}>
                <SongList data={recommendSonglist}></SongList>
            </div>
        </>
    );
};
export default RecommendPlaylist;
