import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import BaseComponent from '../../../components/BaseComponent';

export default class NewsCard extends BaseComponent {
    state = { cover: '' };
    render() {
        const defaultCover = 'https://dbb-web-static.oss-cn-shenzhen.aliyuncs.com/baidu/news/cover.png';
        const { data = { date: '' }, type } = this.props;
        const dataarr = (data.date || '').split('-').map(v => v.padStart(2, '0'));
        return (
            <View
                className="News-NewsCard flex-row"
                onClick={() => {
                    Taro.navigateTo({ url: `pages/news/NewsDetail?id=${data.id}` });
                }}
            >
                <View className="flex-column-between flex1 card-left">
                    <Text className="title">{data.title}</Text>
                    <View className="user flex-row-start-center">
                        <Text className="username">{data.author || '上海店宝宝'}</Text>
                        <Text className="date">
                            {dataarr.length === 3 ? `${dataarr[0]}年${dataarr[1]}月${dataarr[2]}日` : ''}
                        </Text>
                    </View>
                </View>
                {data.cover ? (
                    <Image
                        className="cover"
                        src={this.state.cover || data.cover || defaultCover}
                        lazyLoad={true}
                        mode="aspectFill"
                        onError={() => {
                            this.setState({
                                cover: defaultCover,
                            });
                        }}
                    />
                ) : null}
            </View>
        );
    }
}
