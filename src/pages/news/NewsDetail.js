import Taro from '@tarojs/taro';
import { View, Text, Image, RichText, ScrollView } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getArticles } from '../../actions/article';
import { getSaleMan, setUserInfo } from '../../actions/login';
import { AtToast } from 'taro-ui';
import setPageInfo from '../../service/setPageInfo';
import Header from '../../components/Header';
import Container from '../../components/Container';
import BaseComponent from '../../components/BaseComponent';
import Login from '../login/Login';
import request from '../../service/request';
import events from '../../service/events';
import * as eventsKey from '../../constants/events';
import { DATA_BASE_URL } from '../../constants/urls';
import GLOBAL, { utils } from '../../service/global';

@connect(
    ({ userinfo }) => ({
        userinfo,
    }),
    dispatch => ({
        setUserInfo(info) {
            dispatch(setUserInfo(info));
        },
    })
)
class NewsDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: this.$router.params.id,
            toastOpend: false,
            toast: '',
            weixin: '',
            info: { content: '', date: '' },
            prev: {},
            next: {},
            scrollTop: 0,
            showLogin: false,
        };
    }

    onShareAppMessage = () => {
        const { info } = this.state;
        const { id, type } = this.$router.params;
        return {
            title: `${info.title}`,
            path: `/pages/news/NewsDetail?id=${id}`,
        };
    };

    componentDidMount = async () => {
        // 检查是否展示微信
        this.lock = await utils.lockversion();
        // 初始化数据
        await this.init();
        if (!this.lock) {
            const sale = await getSaleMan();
            this.setState({ weixin: sale });
        }
    };

    init = async () => {
        const { id } = this.state;
        const info = await this.getData(id);
        info && this.setState({ info });
        if (info.nextId) {
            this.getData(info.nextId).then(next => {
                next && this.setState({ next });
            });
        } else {
            this.setState({ next: {} });
        }
        if (info.preId) {
            this.getData(info.preId).then(prev => {
                prev && this.setState({ prev });
            });
        } else {
            this.setState({ prev: {} });
        }
    };

    getData = async id => {
        try {
            const info = (
                await request({
                    url: `${DATA_BASE_URL}mock/taoyuan/v1-0-1/article/all/article-detail/${id}.json`,
                })
            ).data;
            Taro.setNavigationBarTitle({
                title: `${info.key}:${info.title}`,
            });
            return info;
        } catch (e) {
            console.log(e);
        }
    };

    onChangeId = isPrev => {
        this.setState({ hide: true }, () => {
            this.setState({ id: isPrev ? this.state.prev.id : this.state.next.id, hide: false }, () => {
                this.init();
            });
        });
    };

    render() {
        const { info, id, prev, next, scrollTop, hide } = this.state;
        // 获取文章详情
        return (
            <Container className={`News-Detail ${this.props.className}`} noTab pageInfo={info.title}>
                <Header title={info.title || '内容详情'} back />
                {hide ? null : (
                    <ScrollView scrollY scrollWithAnimation>
                        <View className="flex-column article">
                            <Text className="title">{info.title}</Text>
                            <Text className="time">
                                {info.id
                                    ? info.date
                                          .split('-')
                                          .map(v => v.padStart(2, '0'))
                                          .join('-')
                                    : ''}
                            </Text>
                            <RichText
                                className="txt"
                                nodes={info.content
                                    .replace(/ /g, ' ')
                                    .replace(/<img(.+?)style.+?\/>/g, '<img' + '$1' + '/>')
                                    .replace(/<img/g, '<img width="100%"')
                                    .replace(
                                        /<blockquote/g,
                                        '<blockquote style="font-size:22px;font-weight:bold;color:black;line-height: 35px;"'
                                    )
                                    .replace(
                                        /<p/g,
                                        '<p style="font-size:18px;line-height: 35px;margin-top:5px;margin-bottom:30px;"'
                                    )
                                    .replace(/<h1/g, '<h1 style="line-height: 32px;"')
                                    .replace(/<h3/g, '<h3 style="font-size:22px;line-height: 32px;"')
                                    .replace(/<h2/g, '<h2 style="margin: 10px 0;font-size:22px;"')}
                            />
                            {info.id ? (
                                <View
                                    className="flex-row-start-center next-prev"
                                    onClick={() => {
                                        prev.id && this.onChangeId(true);
                                    }}
                                >
                                    <Text>
                                        上一篇：{prev.id ? <Text className="text">{prev.title}</Text> : <Text>无</Text>}
                                    </Text>
                                </View>
                            ) : null}
                            {info.id ? (
                                <View
                                    className="flex-row-start-center next-prev"
                                    onClick={() => {
                                        next.id && this.onChangeId(false);
                                    }}
                                >
                                    <Text>
                                        下一篇：
                                        {next.id ? <Text className="text">{next.title}</Text> : <Text>无</Text>}
                                    </Text>
                                </View>
                            ) : null}
                        </View>
                    </ScrollView>
                )}
                {/* addv */}
                {/* {info.id ? (
                    <View
                        className="flex-row-center-center  addv"
                        openType="launchApp"
                        appParameter="weixin"
                        onClick={() => {
                            this.setState({ showLogin: true, scrollTop: this.scrollTop });
                        }}
                    >
                        <View className="flex-row-center-center wx">
                            <Text className="text">领取免费内容</Text>
                        </View>
                    </View>
                ) : null} */}

                {/* Toast */}
                {/* <AtToast isOpened={toastOpend} text={toast}></AtToast> */}
                {/* {showLogin ? (
                    <Login
                        setUserInfo={this.props.setUserInfo}
                        onClose={() => {
                            this.setState({ showLogin: false, scrollTop: this.scrollTop });
                        }}
                    />
                ) : null} */}
            </Container>
        );
    }
}

export default NewsDetail;
