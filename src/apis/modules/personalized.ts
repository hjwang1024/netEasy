import axios from '../request';
import { IGetPersonalizedSonglistRequest, IMusic, IMV, IBanner } from './types/personalized';

type GetBannerFn = () => Promise<IBanner[]>;

export const getBanner: GetBannerFn = () => {
    return axios({
        url: '/banner',
        params: {
            type: 0,
        },
    });
};
