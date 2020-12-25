import Taro from '@tarojs/taro';

export default {
    get: key => {
        return Taro.getStorageSync(key);
    },
    set: (key, value) => {
        Taro.setStorageSync(key, value);
    },
    clear: () => {
        Taro.clearStorageSync();
    },
};
