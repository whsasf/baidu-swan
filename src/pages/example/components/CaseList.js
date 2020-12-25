import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import BaseComponent from '../../../components/BaseComponent';

export default class CaseList extends BaseComponent {
    render() {
        const { data, onClick } = this.props;

        return (
            <View
                className="flex-column"
                onClick={() => {
                    onClick && onClick();
                }}
            >
                <View
                    className="Home-CaseList flex-row-between-center"
                    onClick={() => {
                        Taro.navigateTo({ url: `./CaseDetail?id=${data.id}` });
                    }}
                >
                    <View className="left flex-row-start-center">
                        <Image src={data.avatar} className="avatar" src={data.avatar} />
                        <View className="msg flex-column">
                            <Text className="username">{data.username}</Text>
                            <Text className="price">
                                当前月销售额&nbsp;<Text className="price-active">{data.count}+</Text>
                            </Text>
                        </View>
                    </View>
                    <View className="right flex-column">
                        <Text className="date">{data.time}加盟</Text>
                        <View className="tag flex-row-center-center">
                            <Text className="tagtext">{data.tag}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
