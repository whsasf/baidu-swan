import Taro from '@tarojs/taro';
import store from './store';
import * as storeKey from '../constants/store';
import request from './request';
import { DATA_BASE_URL } from '../constants/urls';

// 获取状态栏高度
let info;
const getInfo = async () => {
    if (info !== undefined) return info;
    const ret = await Taro.getSystemInfo({});
    info = ret;
    console.log('ret', ret);
    return ret;
};

const getSafeBottom = async () => {
    const safe = ((await getInfo()).safeArea || {}).bottom || 0;
    return safe ? info.screenHeight - safe : 0;
};

getSafeBottom();

export const utils = {
    version: '1.0.0',
    lockversion: async () => {
        try {
            const { taoyuanV1 } = (await request({ url: `${DATA_BASE_URL}config.json` })).data;
            if (taoyuanV1 === utils.version) return true;
            return false;
        } catch (e) {
            return true;
        }
    },
};

export default {
    getInfo, // 状态栏高度
    getSafeBottom, // 获取安全距离
    isLogin: !!store.get(storeKey.USER_INFO).username, // 是否登录
    calculateHeight: async ({ staticHeight = 0, hasTab = false }) => {
        //计算高度
        const { windowHeight, windowWidth, statusBarHeight } = await getInfo();
        const safeBottom = await getSafeBottom();
        const rate = windowWidth / 750;
        return windowHeight - safeBottom - statusBarHeight - rate * (staticHeight + 88 + (hasTab ? 100 : 0));
    },
    rate: async () => {
        // 计算比率
        const { windowWidth } = await getInfo();
        return windowWidth / 750;
    },
    statusBarHeight: async () => {
        return (await getInfo()).statusBarHeight;
    },
};
