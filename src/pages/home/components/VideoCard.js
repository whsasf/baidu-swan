import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import BaseComponent from '../../../components/BaseComponent';

export default class VideoCard extends BaseComponent {
    render() {
        const { data = {}, onClick } = this.props;
        return (
            <View className="flex-column">
                <View
                    className="Home-VideoCard flex-row-start-center"
                    onClick={() => {
                        let next = true;
                        if (onClick) next = onClick();
                        next &&
                            Taro.navigateTo({ url: `pages/course/CourseDetail?type=hot&seriesid=${data.seriesid}` });
                    }}
                >
                    <Image className="cover" src={data.image} mode="scaleToFill" />
                    <View className="right flex-column-between">
                        <Text className="title">{data.name}</Text>
                        <View className="flex-row-between-end">
                            <Text className="count">{data.videocount}课时</Text>
                            <Text className="study">
                                <Text className="study-count">{data.user_count}人</Text>正在学习
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
