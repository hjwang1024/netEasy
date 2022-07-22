import axios from '../request';
import { ISonglist } from './types/business';

import { IGetPersonalizedSonglistRequest, IMusic, IMV, IBanner } from './types/personalized';
type GetPersonalizedSonglistFn = (params: IGetPersonalizedSonglistRequest) => Promise<ISonglist[]>;

type GetBannerFn = () => Promise<IBanner[]>;

export const getBanner: GetBannerFn = () => {
    return axios({
        url: '/banner',
        params: {
            type: 0,
        },
    });
};
export const getRecommendSonglist: GetPersonalizedSonglistFn = ({ limit }) => {
    return axios({
        url: '/personalized',
        params: {
            limit,
        },
    });
};
