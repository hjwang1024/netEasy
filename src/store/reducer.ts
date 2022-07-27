import { ILoginRequest, ILoginResult } from '@/apis/modules/types/user';
import { pick } from '~/util';
export interface IGlobalState {
    userInfo: ILoginResult | null;
}
interface IGlobalAction {
    type: string;
    payload: any;
}

const defaultState: IGlobalState = {
    userInfo: null,
};

export default (state = defaultState, action: IGlobalAction) => {
    switch (action.type) {
        case 'GET_USER_INFO_SUCCESS':
            return {
                userInfo: {
                    ...pick(action.payload, ['token', 'userId', 'profile']),
                    userId: action.payload.account.id,
                },
            };

        default:
            return state;
    }
};
