import Taro from '@tarojs/taro';
import store from './store';
import * as storeKeys from '../constants/store';

export default function request(originOptions = {}) {
    const options = { method: 'GET', data: {}, ...originOptions };
    return Taro.request({
        url: options.url,
        data: options.data,
        header:
            options.method.toUpperCase() === 'GET'
                ? undefined
                : {
                      'Content-Type': 'application/json',
                      Cookie: store.get(storeKeys.COOKIE),
                  },
        method: options.method.toUpperCase(),
        cors_mode: 'cors',
        credentials: 'include',
    }).then(res => {
        return res;
    });
}
