import { ISonglist } from './types/business';
import axios from '../request';
import { IGetSonglistsRequest, IGetSonglistCatsResponse, ICategory } from './types/songlist';

type GetUserSonglistFn = (uid: number) => Promise<ISonglist[]>;
type GetHighQualitySonglistFn = (cat?: string) => Promise<ISonglist>;
type GetSonglistHotCatsFn = () => Promise<ICategory[]>;
type GetSonglistCatsFn = () => Promise<IGetSonglistCatsResponse>;
type GetSonglistsFn = (
    params: IGetSonglistsRequest,
) => Promise<{ playlists: ISonglist[]; total: number }>;
type GetSonglistDetailFn = (id: string) => Promise<{ songs: ISonglist[] }>;
// siderBar 歌单
export const getUserSonglist: GetUserSonglistFn = (uid) => {
    return axios({
        url: '/user/playlist',
        params: {
            uid,
            limit: 100,
        },
    });
};
//获取精品歌单
export const getHighQualitySonglist: GetHighQualitySonglistFn = (cat = '全部') => {
    return axios({
        url: '/top/playlist/highquality',
        params: {
            limit: 1,
            cat,
        },
    });
};

//获取热度歌单标签
export const getSonglistHotCats: GetSonglistHotCatsFn = (cat = '全部') => {
    return axios({
        url: '/playlist/hot',
    });
};
// 所有歌单标签
export const getSonglistCats: GetSonglistCatsFn = async () => {
    return await axios({
        url: '/playlist/catlist',
    });
};
// 获取歌单列表
export const getSonglists: GetSonglistsFn = async ({ cat, order, limit = 100, offset }) => {
    const response = await axios({
        url: '/top/playlist',
        params: {
            cat,
            order,
            limit,
            offset,
        },
    });

    return response;
};
// 获取歌单详情
export const getSonglistDetail: GetSonglistDetailFn = async (id) => {
    const response = await axios({
        url: '/playlist/detail',
        params: {
            id,
        },
    });
    return response;
};
// 获取歌单所有歌曲
export const getSonglistAllMusic: GetSonglistDetailFn = async (id) => {
    const response = await axios({
        url: '/playlist/track/all',
        params: {
            id,
            limit: 1000,
            offset: 0,
        },
    });
    return response;
};
