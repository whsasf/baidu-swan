import Taro from '@tarojs/taro';
import { View, Text, Input, Image } from '@tarojs/components';
import IconFont from '../../components/iconfont';
import BaseComponent from '../../components/BaseComponent';
import { sendMessage, login, setUserInfo } from '../../actions/login';
import { AtToast } from 'taro-ui';
import store from '../../service/store';
import * as storeKeys from '../../constants/store';
import event from '../../service/events';
import * as eventKeys from '../../constants/events';
import GLOBAL from '../../service/global';
import setPageInfo from '../../service/setPageInfo';

export default class Login extends BaseComponent {
    testMobile = '13000005630';
    state = {
        mobile: '',
        code: '',
        isSign: false,
        lastTime: 0,
        toastOpend: false,
        toast: '',
        isVoiceCode: false, // 是否是语音验证码
        hasSigned: GLOBAL.isLogin || false,
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
        const { mobile, code, isSign, toastOpend, toast, lastTime, isVoiceCode, hasSigned } = this.state;
        const isTest = mobile === this.testMobile;
        console.log('hasSigned,', hasSigned);
        return (
            <View className="Login flex-column-center-center">
                {GLOBAL.isLogin ? (
                    <View className="flex-column-start-center box1">
                        <View className="flex-row-center-center cancle" onClick={this.onBack}>
                            <IconFont name="guanbi" size={28} color="rgba(143, 143, 143, 1)" />
                        </View>
                        <Image
                            src="https://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/quick-app/login/login-2.png"
                            className="cover"
                        />
                        <View className="flex-column status-box">
                            <Text className="status">您已注册成功</Text>
                            <Text className="status">等待领取资料</Text>
                        </View>
                        <View className="line" />
                        <View className="flex-column tinp-box">
                            <Text className="tinp">同时也可以在各大应用商店搜索</Text>
                            <Text className="tinp">下载“店宝宝”APP</Text>
                        </View>
                    </View>
                ) : (
                    <View className="flex-column-start-center box">
                        <View className="flex-row-center-center cancle" onClick={this.onBack}>
                            <IconFont name="guanbi" size={28} color="white" />
                        </View>
                        <Image
                            src="https://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/quick-app/login/login-1.png"
                            className="cover-top"
                        />
                        <View className="flex-row-center slogan">
                            <Text className="slogan-text">完善信息，获取免费课程。</Text>
                        </View>
                        <View className="mobile flex-row-start-center">
                            <Input
                                placeholder="+86 请输入手机号码"
                                className="input"
                                onInput={this.onInput}
                                value={mobile}
                                type="number"
                                maxLength={11}
                            />
                            {mobile ? (
                                <View onClick={this.onCancleMobile}>
                                    <IconFont name="guanbi" color="rgba(207, 202, 202, 1)" size={26} />
                                </View>
                            ) : null}
                        </View>
                        <View className="code flex-row-start-center">
                            <Input
                                placeholder={isTest ? '请输入密码' : '输入验证码'}
                                className="input"
                                disabled={!mobile.match(/^1\d{10}$/)}
                                type={isTest ? 'password' : 'number'}
                                password={isTest}
                                maxLength={11}
                                onInput={this.onCodeInput}
                                value={code}
                            />
                            {isTest ? null : (
                                <Text className="text" onClick={this.onGetCode}>
                                    {lastTime ? `${lastTime}秒后重发` : isVoiceCode ? '获取语音验证码' : '获取验证码'}
                                </Text>
                            )}
                        </View>
                        <View className="flex-row-center-center login" onClick={this.onLogin}>
                            <Text className="text">提交</Text>
                        </View>
                    </View>
                )}

                {toastOpend ? <AtToast isOpened={toastOpend} text={toast} duration={2000}></AtToast> : null}
            </View>
        );
    }
}
