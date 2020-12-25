import Taro from '@tarojs/taro';

const isweb = Taro.getEnv() === 'WEB';

export const DATA_BASE_URL = isweb ? 'oss/' : 'https://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/';

export const API_BASE_URL = isweb ? 'api/' : 'https://small.dianbaobao.com/';
// export const API_BASE_URL = isweb ? 'api/' : 'http://sjgc35.3322.org:8090/';
