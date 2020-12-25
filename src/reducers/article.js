import * as types from '../constants/types';

const INITIAL_STATE = [];

const filterData = data => {
    const ret = [];
    data.forEach(item => {
        const exit = ret.find(v => v.id === item.id);
        if (!exit) ret.push(item);
    });
    return ret;
};

export default function article(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_ARTICLE:
            return filterData(action.page === 1 ? [...action.data] : [...state, ...action.data]);
        default:
            return state;
    }
}
