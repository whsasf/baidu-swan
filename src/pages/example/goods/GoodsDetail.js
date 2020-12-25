import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import BaseComponent from '../../../components/BaseComponent';
import Chat from '../../../components/Chat';

@connect(({ goods }) => ({
    goods,
}))
class GoodsDetail extends BaseComponent {
    static options = {
        addGlobalClass: true,
    };

    render() {
        const { type, id } = this.$router.params;
        const { goods } = this.props;
        // 百度小程序第一次获取不到参数
        if (!type || !goods) return null;
        const detail = (goods[type] || []).find(v => v.id === id - 0) || {
            detail: { images: [], bak: '', category: [], skus: [], productImages: [] },
            pricelist: [{}],
        };
        // 百度小程序IOS 不支持零宽度断言
        const images = detail.detail.productImages;
        const swiper = detail.detail.images.filter(image => {
            return image.taobaoimageurl.includes('/i3/') && !image.isdefault;
        });
        return (
            <Container className={`Home-GoodsDetail ${this.props.className}`} noTab>
                <Header title="商品详情" back />
                {/* swiper */}
                <Swiper className="swiper" vertical={false} circular autoplay>
                    {(swiper.length ? swiper : images.length ? [{ taobaoimageurl: images[0] }] : []).map(image => {
                        console.log('image.taobaoimageurl', image.taobaoimageurl);
                        return (
                            <SwiperItem>
                                <Image className="img" src={image.taobaoimageurl} lazyLoad />
                            </SwiperItem>
                        );
                    })}
                </Swiper>
                {/* detail */}
                <View className="detail flex-column">
                    <View className="flex-row-start-center price">
                        <Text className="newprice">￥{detail.pricelist.reverse()[0].price}</Text>
                        <Text className="oldprice">市场价:￥{detail.tbprice}</Text>
                        <Text className="salecount">销{detail.detail.salenum}件</Text>
                    </View>
                    <Text className="title">
                        <Text className="tag">热销</Text>
                        {detail.title}
                    </Text>
                </View>
                {/* tabs */}
                {/* <View className="tabs flex-row">
                    <View className="tab flex-row-center-center">
                        <Text className="text text-active">颜色分类</Text>
                    </View>
                    <View className="tab tab-border flex-row-center-center">
                        <Text className="text">商品参数</Text>
                    </View>
                    <View className="tab flex-row-center-center">
                        <Text className="text">商品详情</Text>
                    </View>
                </View> */}
                {/* 颜色分类 */}
                <View className="saleprops params">
                    <View className="header flex-row-start-center">
                        <Text className="title">颜色分类</Text>
                    </View>
                    {detail.detail.skus.map(sku => (
                        <View className="flex-row-start-center item">
                            <Text className="title title1">{`${sku.carsprovalnoname1}(${sku.itemno})`}</Text>
                        </View>
                    ))}
                </View>
                {/* 商品参数 */}
                <View className="params">
                    <View className="header flex-row-start-center">
                        <Text className="title">商品参数</Text>
                    </View>
                    <View className="flex-row-start-center item">
                        <Text className="title">商品编号</Text>
                        <Text className="sub">{detail.goodsno}</Text>
                    </View>
                    <View className="flex-row-start-center item">
                        <Text className="title">所在地区</Text>
                        <Text className="sub">{detail.detail.city}</Text>
                    </View>
                    <View className="flex-row-start-center item">
                        <Text className="title">类目</Text>
                        <Text className="sub">{detail.detail.category.join('>')}</Text>
                    </View>
                    <View className="flex-row-start-center item">
                        <Text className="title">已出售</Text>
                        <Text className="sub">{detail.detail.salenum}</Text>
                    </View>
                    <View className="flex-row-start-center item">
                        <Text className="title">库存</Text>
                        <Text className="sub">充足</Text>
                    </View>
                    <View className="flex-row-start-center item">
                        <Text className="title">重量</Text>
                        <Text className="sub">{detail.detail.weight}</Text>
                    </View>
                </View>
                {/* 商品详情 */}
                <View className="detailh5">
                    <View className="header flex-row-start-center">
                        <Text className="title">商品详情</Text>
                    </View>
                    {images.map(image => (
                        <Image src={image} className="detailimg" mode="widthFix" lazyLoad />
                    ))}
                </View>

                <Chat className="consult flex-row-center-center" openType="contact">
                    <Text className="text">立即咨询</Text>
                </Chat>
            </Container>
        );
    }
}

export default GoodsDetail;
