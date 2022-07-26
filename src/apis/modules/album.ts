import axios from '../request';

import { IAlbum } from './types/business';
export interface IGetAlbumResponse {
    album: IAlbum;
    songs: any[];
}
type GetAlbumFn = (id: number) => Promise<IGetAlbumResponse>;

export const getAlbum: GetAlbumFn = async (id) => {
    const response = await axios({
        url: '/album',
        params: {
            id,
        },
    });

    return response;
};
