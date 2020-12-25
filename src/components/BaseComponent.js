import Taro, { Component } from '@tarojs/taro';

export default class BaseComponent extends Component {
    static options = {
        addGlobalClass: true,
    };
    onShareAppMessage = () => {
        return {
            title: `怎么赚钱平台`,
            path: `/Index`,
        };
    };
}
