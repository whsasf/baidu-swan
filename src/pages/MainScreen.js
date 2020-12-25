import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import BaseComponent from '../components/BaseComponent';
import Example from './example/Example';
import News from './news/News';
import Course from './course/Course';
import Introduce from './introduce/Introduce';
import IconFont from '../components/iconfont';
import events from '../service/events';
import * as eventsKey from '../constants/events';
import GLOBAL from '../service/global';
import setPageInfo from '../service/setPageInfo';
import Login from './login/Login';
import './MainScreen.scss';

export default class MainScreen extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            tabs: [
                { title: '赚钱方法', icon: 'zixun1' },
                // { title: '课程教程', icon: 'jijin' },
                { title: '赚钱视频', icon: 'jijin' },
                { title: '成功案例', icon: 'anli1' },
            ],
            show: false,
            safeBottom: 0,
            showLogin: false,
        };

        this.initPages = [];
    }

    componentDidMount = async () => {
        try {
            // safeBottom
            const safeBottom = await GLOBAL.getSafeBottom();
            this.setState({ safeBottom, show: true });
            // 设置SEO
            setPageInfo();
            // 监听底部切换
            events.on(eventsKey.SHOW_LOGIN, () => {
                this.setState({ showLogin: true });
            });
            events.trigger(eventsKey.SHOW_LOGIN);
        } catch (e) {
            console.log(e);
        }
    };

    componentWillUnmount() {}

    onCurrentUpdate = index => {
        if (index !== this.state.current) {
            Taro.pageScrollTo({ scrollTop: 0, duration: 0 });
            this.setState({ current: index });
        }
    };

    render() {
        const { current, tabs, show, safeBottom, showLogin } = this.state;
        return (
            <View className="MainScreen absolute">
                {tabs.map((tab, key) => {
                    switch (tab.title) {
                        case '赚钱方法': {
                            return (
                                <View className={`container ${key !== current && 'hidden'}`} key={tab.title}>
                                    <News show={key === current && show} />
                                </View>
                            );
                        }
                        case '课程教程': {
                            return (
                                <View className={`container ${key !== current && 'hidden'}`} key={tab.title}>
                                    {/* <Introduce show={key === current && show} /> */}
                                    <Course show={key === current && show} />
                                </View>
                            );
                        }
                        case '成功案例': {
                            return (
                                <View className={`container ${key !== current && 'hidden'}`} key={tab.title}>
                                    <Example show={key === current && show} />
                                </View>
                            );
                        }
                    }
                })}
                <View className="bottom">
                    <View className="bottom-nav flex-row-between-center">
                        {tabs.map((tab, index) => (
                            <View
                                key={tab.title}
                                className="item flex-column-center-center"
                                onClick={() => {
                                    this.onCurrentUpdate(index);
                                }}
                            >
                                <IconFont
                                    name={tab.icon}
                                    color={current === index ? 'rgba(40, 126, 255, 1)' : 'rgba(143, 143, 143, 1)'}
                                    size={36}
                                />
                                <Text className={`text ${current === index ? 'text-active' : ''}`}>{tab.title}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={{ height: safeBottom + 'px' }} />
                </View>
            </View>
        );
    }
}
