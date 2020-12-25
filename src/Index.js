import Taro from '@tarojs/taro';
import MainScreen from './pages/MainScreen';

export default class Index extends Taro.Component {
    onShareAppMessage = () => {
        return {
            title: `怎么赚钱平台`,
            path: `/Index`,
        };
    };

    render() {
        return <MainScreen />;
    }
}
