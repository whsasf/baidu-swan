import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import configStore from './store';
import Index from './Index';
import './app.scss';

const store = configStore();

class App extends Component {
    config = {
        pages: [
            'Index',
            // 'pages/home/case/Case',
            'pages/example/case/CaseDetail',
            // 'pages/home/goods/Goods',
            // 'pages/home/goods/GoodsDetail',
            'pages/course/CourseDetail',
            'pages/news/NewsDetail',
            'pages/user/Arguments',
            'pages/user/About',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '巽颐赚钱资讯',
            navigationBarTextStyle: 'black',
            navigationStyle: 'custom',
        },
        sitemapLocation: 'sitemap.json',
    };
    render() {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        );
    }
}

Taro.render(<App />, document.getElementById('app'));
