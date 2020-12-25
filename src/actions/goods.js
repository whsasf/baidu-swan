import { GET_GOODS } from '../constants/types';
import request from '../service/request';
import { DATA_BASE_URL } from '../constants/urls';

export function getGoods(type) {
    return async dispatch => {
        try {
            const url = `${DATA_BASE_URL}mock/goods/${type}.json`;
            const res = (await request({ url })).data;
            const data = {};
            data[type] = res;
            dispatch({ type: GET_GOODS, data });
        } catch (e) {
            console.log(e);
        }
    };
}
