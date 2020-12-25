import { GET_USER_INFO, CLEAR_USER_INFO, GET_SALE_MAN } from '../constants/types';
import request from '../service/request';
import { API_BASE_URL } from '../constants/urls';
import Taro from '@tarojs/taro';
import store from '../service/store';
import { SALEMAN } from '../constants/store';

export async function sendMessage(mobile, isVoiceCode) {
    try {
        const ret = await request({
            url: `${API_BASE_URL}user/${isVoiceCode ? 'VoiceSmsLoginCode' : 'SmsLoginCode'}`,
            method: 'POST',
            data: {
                username: mobile.replace(/ /g, ''),
                type: 'loginByTel',
                deviceInfo: '',
                v: 1,
            },
        });
        return ret.data;
    } catch (e) {
        console.log(e);
    }
}

export async function login(mobile, code) {
    try {
        const ret = await request({
            url: `${API_BASE_URL}user/SmsLogin`,
            method: 'POST',
            data: {
                type: 'loginByTel',
                username: mobile.replace(/ /g, ''),
                vcode: code,
                otherBak: JSON.stringify({ channel: 'baidu_mp_save_news' }),
            },
        });
        return ret;
    } catch (e) {
        console.log(e);
    }
}

export async function getSaleMan() {
    try {
        const ret = (
            await request({
                url: `${API_BASE_URL}user/GetSalesman`,
                method: 'POST',
                data: {},
            })
        ).data;
        if (ret.code === 0) {
            store.set(SALEMAN, ret.message.weixin_no);
            return ret.message.weixin_no;
        } else {
            return store.get(SALEMAN);
        }
    } catch (e) {}
}

export function setUserInfo(data) {
    return {
        type: GET_USER_INFO,
        data,
    };
}

export function cleaerUserInfo() {
    return {
        type: CLEAR_USER_INFO,
        data: {},
    };
}
