import Taro from '@tarojs/taro';
import { View, Text, Input, Image, ScrollView } from '@tarojs/components';
import IconFont from '../../components/iconfont';
import BaseComponent from '../../components/BaseComponent';
import { sendMessage, login, setUserInfom } from '../../actions/login';
import { AtToast } from 'taro-ui';
import store from '../../service/store';
import * as storeKeys from '../../constants/store';
import event from '../../service/events';
import * as eventKeys from '../../constants/events';
import GLOBAL from '../../service/global';
import setPageInfo from '../../service/setPageInfo';
import Container from '../../components/Container';
import Header from '../../components/Header';

export default class Introduce extends BaseComponent {
    testMobile = '13000005630';
    state = {
        mobile: '',
        code: '',
        isSign: false,
        lastTime: 0,
        toastOpend: false,
        toast: '',
        isVoiceCode: false, // 是否是语音验证码
    };

    componentDidMount() {
        setPageInfo();
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        this.toastTimer && clearTimeout(this.toastTimer);
    }

    showToast = message => {
        if (!this.state.toastOpend) {
            this.setState({ toastOpend: true, toast: message }, () => {
                this.toastTimer = setTimeout(() => {
                    this.setState({ toastOpend: false });
                }, 2000);
            });
        }
    };

    // 手机号输入
    onInput = value => {
        const inputvalue = value.detail.value.trim();
        if (inputvalue.match(/^1\d{0,10}$/) || !inputvalue) {
            this.setState({ mobile: value.detail.value.trim() });
        } else {
            this.setState({ mobile: this.state.mobile });
        }
    };

    // 验证码输入
    onCodeInput = value => {
        const isTest = this.testMobile === this.state.mobile;
        const inputvalue = value.detail.value.trim();
        if (!isTest) {
            if (inputvalue.match(/^\d{0,4}$/) || !inputvalue) {
                this.setState({ code: value.detail.value.trim() });
            } else {
                this.setState({ code: this.state.code });
            }
        } else {
            this.setState({ code: inputvalue });
        }
    };

    // 取消手机号
    onCancleMobile = () => {
        this.setState({ mobile: '' });
    };

    // 切换登录方式
    onSwitchSign = () => {
        this.setState({ isSign: !this.state.isSign });
    };

    // 获取验证码
    onGetCode = async () => {
        try {
            if (this.lockGetCode) return;
            this.lockGetCode = true;
            const { mobile, lastTime, isVoiceCode } = this.state;
            if (!mobile.match(/^1\d{10}$/)) {
                return this.showToast('请输入完整手机号');
            }
            if (lastTime) return;

            const res = await sendMessage(mobile, isVoiceCode);
            if (res.code === 0) {
                const { wait, isshowvoicecode } = res.message;
                this.setState({ lastTime: wait - 0, isVoiceCode: !!isshowvoicecode }, () => {
                    this.timer = setInterval(() => {
                        if (this.state.lastTime > 0) {
                            this.setState({ lastTime: this.state.lastTime - 1 });
                        } else {
                            this.timer && clearInterval(this.timer);
                        }
                    }, 1000);
                });
            } else if (res.message) {
                return this.showToast(res.message);
            }
        } catch (e) {
            console.log(e);
            return this.showToast('获取验证码失败');
        } finally {
            this.lockGetCode = false;
        }
    };

    // 点击登录
    onLogin = async () => {
        try {
            if (this.loginLock) return;
            this.loginLock = true;
            const { mobile, code } = this.state;
            const isTest = mobile === this.testMobile;
            if (!mobile.match(/^1\d{10}$/)) {
                return this.showToast('手机号格式不正确');
            }
            if (isTest) {
                if (code !== '1234') {
                    return this.showToast('密码错误');
                }
            } else {
                if (!code.match(/^\d{4}$/)) {
                    return this.showToast('验证码格式不正确');
                }
            }

            if (isTest) {
                // 设置用户信息
                const userinfo = {
                    user_avatar: 'http://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/news/avatar.png',
                    username: this.testMobile,
                    vername: '体验版',
                };
                this.props.setUserInfo(userinfo);
                store.set(storeKeys.USER_INFO, userinfo);
                GLOBAL.isLogin = true;
                this.onBack();
            } else {
                const res = await login(mobile, code);
                if (res.data.code === 0) {
                    const userinfo = res.data.message.data;
                    // 更新 props
                    this.props.setUserInfo(userinfo);
                    // 更新 store
                    store.set(storeKeys.USER_INFO, userinfo);
                    // set cookie
                    const cookies = (res.header['Set-Cookie'] || res.header['set-cookie'] || '').replace(/,/g, ';');
                    store.set(storeKeys.COOKIE, cookies);
                    // 修改登录全局状态
                    GLOBAL.isLogin = true;
                    // 回退
                    this.onBack();
                } else if (res.data.message) {
                    return this.showToast(res.data.message);
                }
            }
        } catch (e) {
            return this.showToast('登录失败');
        } finally {
            this.loginLock = false;
        }
    };

    // 回退
    onBack = () => {
        this.props.onClose && this.props.onClose();
    };

    render() {
        const { mobile, code, isSign, toastOpend, toast, lastTime, isVoiceCode } = this.state;
        const isTest = mobile === this.testMobile;
        return (
            <Container className="Introduce flex-column-center-center">
                <Header title="创业积分" />
                <ScrollView>
                    <Image
                        src="https://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/taoyuan-app/intorduce/1.png"
                        className="image"
                        mode="widthFix"
                    />
                </ScrollView>
            </Container>
        );
    }
}
