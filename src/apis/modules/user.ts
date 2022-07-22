import axios from '../request';

import { ILoginRequest, ILoginResult } from './types/user';

type LoginFn = (params: ILoginRequest) => Promise<ILoginResult>;

export const login: LoginFn = ({ phone, password }) => {
    return axios({
        url: '/login/cellphone',
        method: 'get',
        params: {
            phone,
            password,
        },
    });
};

export const logout = () => {
    return axios({
        method: 'post',
        url: '/logout',
    });
};
