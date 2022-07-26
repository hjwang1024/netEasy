import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './style.module.scss';
import { renderRoutes } from 'react-router-config';
import ROUTES from '@/router/routes';
import HighQuality from './components/HighQuality';
import axios from '@/apis';
import { ISonglist } from '@/apis/modules/types/business';
import {
    IGetSonglistsRequest,
    IGetSonglistCatsResponse,
    ICategory,
} from '@/apis/modules/types/songlist';
import SongList from '@@/SongList';
import Categories from './components/Categories';
import Pagination from '@/components/Pagination';
function HighQualityPage() {
    const [selectedCat, setSelectedCat] = useState('全部');
    const [curPage, setCurPaget] = useState(1);
    const [total, setTotal] = useState(0);

    const [highQualitySonglist, setHighQualitySonglist] = useState<ISonglist>();
    const [hotCatsList, setHotCatsList] = useState<ICategory[]>();
    const [songlistCats, setSonglistCats] = useState<IGetSonglistCatsResponse>();
    const [allSongList, setAllSongList] = useState<ISonglist[]>();

    const getSongTag = async () => {
        // 获取热度歌单标签
        const hotCatsList = await axios.getSonglistHotCats();
        setHotCatsList(hotCatsList.tags);
        // 获取所有歌单标签
        const allCatList = await axios.getSonglistCats();
        setSonglistCats(allCatList);
    };

    const getHighQualitySonglist = async (cat: string) => {
        //获取精品歌单
        const highQualityList = await axios.getHighQualitySonglist(cat);
        setHighQualitySonglist(highQualityList?.playlists?.[0] || []);
    };

    const getAllSonglist = async (cat?: string, offset?: number) => {
        // 获取所有歌单
        console.log(selectedCat);

        const allSongList = await axios.getSonglists({ cat, offset });
        setAllSongList(allSongList.playlists || []);
        setTotal(allSongList.total);
    };
    const handlePageChange = (page: number) => {
        const offset = (page - 1) * 100;
        getAllSonglist(selectedCat, offset);
        setCurPaget(page);
    };

    const handleCatSelect = (cat: string) => {
        setSelectedCat(cat);
        getAllSonglist(cat, 0);
        getHighQualitySonglist(cat);
        setCurPaget(1);
    };

    useEffect(() => {
        getHighQualitySonglist(selectedCat);
        getAllSonglist();
        getSongTag();
    }, []);
    return (
        <>
            <HighQuality data={highQualitySonglist}></HighQuality>
            <div className={styles.categories}>
                <Categories
                    cats={songlistCats}
                    hotCats={hotCatsList}
                    selectedCat={selectedCat}
                    onCatSelect={handleCatSelect}
                />
            </div>
            <SongList data={allSongList}></SongList>
            <div className={styles.pagination}>
                <Pagination
                    page={curPage}
                    total={total}
                    onPageChange={handlePageChange}
                ></Pagination>
            </div>
        </>
    );
}

export default HighQualityPage;
