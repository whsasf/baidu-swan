import { ADD, MINUS } from '../constants/counter';
import { DATA_BASE_URL } from '../constants/urls';
import request from '../service/request';

export const add = () => {
    return {
        type: ADD,
    };
};
export const minus = () => {
    return {
        type: MINUS,
    };
};

export function asyncAdd() {
    return async dispatch => {
        await request({ url: 'http://47.103.44.99/tag' });
        dispatch(add());
    };
}
