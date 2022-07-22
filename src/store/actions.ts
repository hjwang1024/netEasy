import { ILoginRequest } from '@/apis/modules/types/user';
import axios from '@/apis';
export const actionSuccess = (payload = {}): any => {
    return {
        type: 'GET_USER_INFO_SUCCESS',
        payload,
    };
};

export const actionError = () => {
    return {
        type: 'GET_USER_INFO_ERROR',
    };
};

export const loginFun = (params: ILoginRequest) => {
    return async (dispatch: any) => {
        axios
            .login(params)
            .then((res: any) => {
                dispatch(actionSuccess(res));
            })
            .catch(() => dispatch(actionError()));
    };
};
