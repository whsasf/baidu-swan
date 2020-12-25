import { View, Text } from '@tarojs/components';
import BaseComponent from '../../../components/BaseComponent';
import IconFont from '../../../components/iconfont/';

export default class CardTitle extends BaseComponent {
    render() {
        const { title, onClick } = this.props;

        return (
            <View
                className="flex-column"
                onClick={() => {
                    onClick && onClick();
                }}
            >
                <View className="Home-CardTitle flex-row-between-center">
                    <View className="flex-row-start-center left">
                        <View className="line" />
                        <Text className="title">{title}</Text>
                    </View>
                    <View className="flex-row-start-center right">
                        <Text className="more">查看更多</Text>
                        <IconFont name="lianhe1" color="rgba(242, 177, 20, 1)" size={20} />
                    </View>
                </View>
            </View>
        );
    }
}
