import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import GLOBAL from '../service/global';
import IconFont from './iconfont';
import './Header.scss';
import { $CombinedState } from 'redux';

let statusBarHeight = 0;
export default class Header extends Component {
    static options = {
        addGlobalClass: true,
    };

    state = { statusBarHeight: statusBarHeight };

    componentDidMount = async () => {
        if (!statusBarHeight) {
            statusBarHeight = (await GLOBAL.getInfo()).statusBarHeight;
        }
        this.setState({ statusBarHeight: statusBarHeight });
    };

    render() {
        const { title, leftIcon, onLeftClick, line, isActive, back } = this.props;
        const { statusBarHeight } = this.state;
        const onlyTitle = !leftIcon && !back;
        return (
            <View className="Header">
                <View
                    style={{
                        height: statusBarHeight + 'px',
                        backgroundColor: isActive ? 'rgba(255, 202, 39, 1)' : null,
                    }}
                />
                <View
                    className={`content ${onlyTitle ? 'flex-row-center-center' : 'flex-row-between-center'} `}
                    style={{ backgroundColor: isActive ? 'rgba(255, 202, 39, 1)' : null }}
                >
                    {!onlyTitle ? (
                        <View
                            className="leftButton flex-row-center-center"
                            onClick={() => {
                                if (back) {
                                    const length = Taro.getCurrentPages().length;
                                    if (length === 1) {
                                        Taro.navigateTo({ url: '/Index' });
                                    } else {
                                        Taro.navigateBack();
                                    }
                                } else {
                                    onLeftClick && onLeftClick();
                                }
                            }}
                        >
                            <IconFont
                                name={back ? 'fanhui' : leftIcon.name}
                                color={back ? 'rgba(35, 26, 18, 1)' : leftIcon.color || 'rgba(35, 26, 18, 1)'}
                                size={40}
                            />
                        </View>
                    ) : null}
                    <Text className="title line1">{title}</Text>
                    {!onlyTitle ? <View className="right" /> : null}
                </View>
                {line ? <View className="line" /> : null}
            </View>
        );
    }
}
