import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { cleaerUserInfo } from '../../actions/login';
import Header from '../../components/Header';
import Container from '../../components/Container';
import BaseComponent from '../../components/BaseComponent';
import IconFont from '../../components/iconfont';
import RowItem from './components/RowItem';
import events from '../../service/events';
import * as eventsKey from '../../constants/events';
import store from '../../service/store';
import GLOBAL from '../../service/global';

@connect(
    ({ userinfo }) => ({
        userinfo,
    }),
    dispatch => ({
        cleaerUserInfo() {
            dispatch(cleaerUserInfo());
        },
    })
)
class User extends BaseComponent {
    state = {
        current: 0,
        row1: [
            {
                icon: 'xuexizhinan1',
                iconColor: 'rgba(99, 196, 43, 1)',
                title: '学习指南',
                onClick: () => {
                    events.trigger(eventsKey.BOTTOM_TAB_CHANGE, 2);
                },
            },
            {
                icon: 'zaixianzixun1',
                iconColor: 'rgba(78, 138, 255, 1)',
                openType: 'contact',
                title: '在线咨询',
            },
        ],
        row2: [
            {
                icon: 'yonghuyinsixieyi1',
                iconColor: 'rgba(17, 152, 255, 1)',
                title: '用户协议与隐私政策',
                onClick: () => {
                    Taro.navigateTo({ url: 'pages/user/Arguments' });
                },
            },
            {
                icon: 'guanyuwomen1',
                iconColor: 'rgba(254, 81, 0, 1)',
                title: '关于我们',
                onClick: () => {
                    Taro.navigateTo({ url: 'pages/user/About' });
                },
            },
            {
                icon: 'zhuxiao1',
                iconColor: 'rgba(187, 187, 187, 1)',
                title: '注销账号',
                onClick: () => {
                    this.logout();
                },
            },
        ],
    };

    logout = () => {
        store.clear();
        this.props.cleaerUserInfo();
        GLOBAL.isLogin = false;
        Taro.navigateTo({ url: 'pages/login/Login' });
        // 切换到主页
        events.trigger(eventsKey.BOTTOM_TAB_CHANGE, 0);
    };

    render() {
        const { row1, row2 } = this.state;
        const { userinfo } = this.props;
        if (!this.props.show) return null;
        return (
            <Container className={`User ${this.props.className}`}>
                <Header title="个人中心" isActive />
                {/* user */}
                <View className="msg flex-row-between">
                    <View className="flex-row-start-center left">
                        <Image className="avatar" src={userinfo.user_avatar} />
                        <View className="txtmsg">
                            <Text className="username">{userinfo.username}</Text>
                            <View className="version flex-row-start-center">
                                <IconFont name="zu2734" color="rgba(255, 202, 39, 1)" size={26} />
                                <Text className="versionname">{userinfo.vername}</Text>
                            </View>
                        </View>
                    </View>
                    {/* <View className="right">
                        <IconFont name="lujing5990" color="rgba(255, 202, 39, 1)" size={43} />
                        <View className="flex-row-center-center count">
                            <Text className="text">1</Text>
                        </View>
                    </View> */}
                </View>
                {/* row1 */}
                <View className="row1">
                    <RowItem data={row1} />
                </View>
                {/* row2 */}
                <View className="row2">
                    <RowItem data={row2} />
                </View>
                {/* button */}
                <View
                    className="flex-row-center-center button"
                    onClick={() => {
                        this.logout();
                    }}
                >
                    <Text className="text">退出我的账号</Text>
                </View>
            </Container>
        );
    }
}

export default User;
