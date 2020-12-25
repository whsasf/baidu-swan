import Taro from '@tarojs/taro';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getVideos } from '../../actions/video';
import { getCase } from '../../actions/case';
import Header from '../../components/Header';
import Container from '../../components/Container';
import BaseComponent from '../../components/BaseComponent';
import IconFont from '../../components/iconfont';
import CardTitle from './components/CardTitle';
import VideoCard from './components/VideoCard';
import GLOBAL from '../../service/global';
import event from '../../service/events';
import * as eventKeys from '../../constants/events';
@connect(
    ({ videos, cases, userinfo }) => ({
        videos,
        cases,
        userinfo,
    }),
    dispatch => ({
        getVideos() {
            dispatch(getVideos());
        },
        getCase() {
            dispatch(getCase());
        },
    })
)
class Home extends BaseComponent {
    defaultProps = {
        videos: {
            hot: [],
        },
    };

    state = {
        goods: [
            [
                {
                    icon: 'http://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/home/mianmo.png',
                    text: '面膜',
                    type: 'mianmo',
                },
                {
                    icon: 'http://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/home/zhiniaoku.png',
                    text: '纸尿裤',
                    type: 'zhiniaoku',
                },
                {
                    icon: 'http://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/home/9.9.png',
                    text: '9.9包邮',
                    type: 'baoyou99',
                },
                {
                    icon: 'http://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/home/qinxi.png',
                    text: '洗护清洁',
                    type: 'xihuqinjie',
                },
                {
                    icon: 'http://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/home/erji.png',
                    text: '耳机耳麦',
                    type: 'erjiermai',
                },
            ],
            [
                {
                    icon: 'http://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/home/xuexiwenju.png',
                    text: '学习文具',
                    type: 'xuexiwenju',
                },
                {
                    icon: 'http://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/home/zhenxinzhentao.png',
                    text: '枕芯枕套',
                    type: 'zhenxinzhentao',
                },
                {
                    icon: 'http://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/home/hot.png',
                    text: '人气爆款',
                    type: 'renqibaokuan',
                },
                {
                    icon: 'http://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/home/shujuxian.png',
                    text: '数据线',
                    type: 'shujuxian',
                },
                {
                    icon: 'http://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/home/zhi.png',
                    text: '纸品湿巾',
                    type: 'zhipinshijin',
                },
            ],
        ],
    };

    componentDidMount = () => {
        this.props.getCase();
        this.props.getVideos();
    };

    gotoLogin = () => {
        Taro.navigateTo({ url: `pages/login/Login` });
    };

    // 商品点击
    onGoodsClick = (text, type) => {
        if (GLOBAL.isLogin) {
            Taro.navigateTo({ url: `pages/home/goods/Goods?title=${text}&type=${type}` });
        } else {
            this.gotoLogin();
        }
    };

    // 资讯点击
    onNewsClick = () => {
        event.trigger(eventKeys.BOTTOM_TAB_CHANGE, 1);
        // if (GLOBAL.isLogin) {
        // } else {
        //     this.gotoLogin();
        // }
    };

    // 案例点击
    onCaseClick = id => {
        if (GLOBAL.isLogin) {
            if (id) {
                Taro.navigateTo({ url: `pages/home/case/CaseDetail?id=${id}` });
            } else {
                Taro.navigateTo({ url: 'pages/home/case/Case' });
            }
        } else {
            this.gotoLogin();
        }
    };

    // 课程点击
    onCourseClick = () => {
        if (GLOBAL.isLogin) {
            event.trigger(eventKeys.BOTTOM_TAB_CHANGE, 2);
        } else {
            this.gotoLogin();
        }
    };

    // 课程详情点击
    onCourseDetailClick = () => {
        if (!GLOBAL.isLogin) {
            this.gotoLogin();
            return false;
        }
        return true;
    };

    // banner点击
    onBannerClick = () => {
        if (!GLOBAL.isLogin) {
            this.gotoLogin();
        } else {
            event.trigger(eventKeys.BOTTOM_TAB_CHANGE, 2);
        }
    };

    render() {
        const { goods } = this.state;
        const { cases = [] } = this.props;
        const videolist = (this.props.videos || this.defaultProps.videos).hot;
        return (
            <Container className={`Home ${this.props.className}`}>
                <Header title="首页" />
                <Image
                    className="banner"
                    mode="widthFix"
                    src="http://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/home/banner.png"
                    onClick={this.onBannerClick}
                />
                {/* goods */}
                <View className="goods flex-column-center-center">
                    {goods.map(good => (
                        <View className="flex-row-between-center good">
                            {good.map(item => (
                                <View
                                    className="flex-column-center-center"
                                    onClick={() => {
                                        this.onGoodsClick(item.text, item.type);
                                    }}
                                >
                                    <Image src={item.icon} className="cover" />
                                    <Text className="text">{item.text}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
                {/* 资讯 */}
                <View className="counsel flex-row-between-center" onClick={this.onNewsClick}>
                    <View className="flex-row-start-center">
                        <Text className="text1">最新</Text>
                        <Text className="text2">资讯:</Text>
                        <Text className="text3">电商平台有哪些模式？摸清电商平台有哪些模式？摸清</Text>
                    </View>
                    <IconFont name="jianqu17" color="rgba(255, 202, 39, 1)" size={56} />
                </View>
                {/* 用户列表 */}
                <View className="flex-column userlist">
                    <CardTitle title="Ta们都在开网店" onClick={this.onCaseClick} />
                    <View style={{ overflow: 'scroll' }}>
                        <ScrollView scrollX className="users" style={{ width: Taro.pxTransform(cases.length * 276) }}>
                            <View className="flex-row">
                                {cases.map(user => (
                                    <View
                                        className="flex-column-center-center user"
                                        onClick={() => {
                                            this.onCaseClick(user.id);
                                        }}
                                    >
                                        <Image className="avatar" src={user.avatar} />
                                        <Text className="username">{user.username}</Text>
                                        <Text className="slogan">目前月销售金额</Text>
                                        <Text className="price">{user.count}+月</Text>
                                        <View className="button flex-row-center-center">
                                            <Text className="text">点击查看</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
                {/* 开店课程 */}
                <View className="flex-column video">
                    <CardTitle title="精选开店教程" onClick={this.onCourseClick} />
                    <View className="videolist flex-column">
                        {videolist.map(video => (
                            <VideoCard data={video} onClick={this.onCourseDetailClick} />
                        ))}
                    </View>
                </View>
            </Container>
        );
    }
}

export default Home;
