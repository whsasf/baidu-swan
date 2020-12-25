import { combineReducers } from 'redux';
import counter from './counter';
import goods from './goods';
import videos from './video';
import cases from './case';
import user from './user';
import article from './article';

export default combineReducers({
    counter,
    goods,
    videos,
    cases,
    userinfo: user,
    article,
});
