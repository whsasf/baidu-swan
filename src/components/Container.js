import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import GLOBAL from '../service/global';
import setPageInfo from '../service/setPageInfo';
import BaseComponent from './BaseComponent';
import './Container.scss';

export default class Container extends BaseComponent {
    state = { statusBarHeight: 0, show: false, screenHeight: 0, safeBottom: 0 };

    componentDidMount = async () => {
        const { statusBarHeight: height, screenHeight } = await GLOBAL.getInfo();
        const safeBottom = await GLOBAL.getSafeBottom();
        // const
        if (height && height !== this.state.statusBarHeight) {
            this.setState({ statusBarHeight: height }, () => {
                // 防止抖动
                this.setState({ show: true });
            });
        } else {
            // 防止抖动
            this.setState({ show: true });
        }
        this.setState({ screenHeight, safeBottom });
        this.pageInfo();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.pageInfo !== this.props.pageInfo) {
            this.pageInfo();
        }
    }

    pageInfo = () => {
        const { pageInfo } = this.props;
        setPageInfo({ title: pageInfo });
    };

    render() {
        const { statusBarHeight, show, screenHeight, safeBottom } = this.state;
        const { noTab = false, className = '' } = this.props;
        if (!show) return null;
        return (
            <View className={`Container flex-column`} style={{ height: screenHeight + 'px' }}>
                <View style={{ paddingTop: statusBarHeight + 'px' }} />
                <View className={`flex-column flex1 ${className ? className : ''}`}>
                    {this.props.children}
                    <View style={{ height: safeBottom + 'px' }} />
                    {noTab ? null : <View className="bar-height" />}
                </View>
            </View>
        );
    }
}
