import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import BaseComponent from '../../../components/BaseComponent';
import GLOBAL from '../../../service/global';

export default class VideoCard extends BaseComponent {
    state = { isIOS: true };

    componentDidMount = async () => {
        const info = await GLOBAL.getInfo();
        if (!(info.platform.toUpperCase() === 'IOS')) {
            this.setState({ isIOS: false });
        }
    };

    render() {
        const { data = {}, type } = this.props;
        return (
            <View className="flex-column">
                <View
                    className="Course-VideoCard flex-row-start-center"
                    onClick={() => {
                        console.log('seriesid', data, data.seriesid);
                        Taro.navigateTo({ url: `pages/course/CourseDetail?type=${type}&seriesid=${data.seriesid}` });
                    }}
                >
                    <Image className="cover" src={data.image} mode="scaleToFill" />
                    <View className="right flex-column-between flex1">
                        <Text className="title">{data.name}</Text>
                        <View className="flex-row-between-end flex1">
                            <View className="flex-row-start-end">
                                {this.state.isIOS ? null : <Text className="price">￥{Math.abs(data.price - 0)}</Text>}
                                <Text className="count">{data.videocount}课时</Text>
                            </View>
                            <Text className="study">{data.user_count}人学习</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
