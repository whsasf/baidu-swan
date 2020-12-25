import * as types from '../constants/types';

const INITIAL_STATE = {
    mianmo: [],
    zhiniaoku: [],
    baoyou99: [],
    xihuqinjie: [],
    erjiermai: [],
    xuexiwenju: [],
    zhenxinzhentao: [],
    renqibaokuan: [],
    shujuxian: [],
    zhipinshijin: [],
};

export default function goods(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_GOODS:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
}
