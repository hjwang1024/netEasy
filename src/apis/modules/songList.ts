import { ISonglist } from './types/business';
import axios from '../request';
type GetUserSonglistFn = (uid: number) => Promise<ISonglist[]>;
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
