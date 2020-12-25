import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import BaseComponent from '../../../components/BaseComponent';

export default class GoodsCard extends BaseComponent {
    render() {
        const { data = { pricelist: [''] }, type } = this.props;
        return (
            <View className="flex-column">
                <View
                    className="Home-GoodsCard flex-row-start-center"
                    onClick={() => {
                        Taro.navigateTo({ url: `./GoodsDetail?type=${type}&id=${data.id}` });
                    }}
                >
                    <Image className="cover" src={data.tbpic} lazyLoad />
                    <View className="right flex-column-between">
                        <View className="flex-column">
                            <Text className="title">{data.title}</Text>
                            <View className="taglist flex-row">
                                <View className="tag flex-column-center-center">
                                    <Text className="tagText">自营</Text>
                                </View>
                            </View>
                        </View>
                        <View className="flex-row-between-end">
                            <Text className="price">￥{data.pricelist.slice(-1)[0].price}</Text>
                            <Text className="oldPrice">零售价:￥{data.tbprice}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
