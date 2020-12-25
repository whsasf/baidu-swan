import { View, Text, Input } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getGoods } from '../../../actions/goods';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import BaseComponent from '../../../components/BaseComponent';
import IconFont from '../../../components/iconfont';
import GoodsCard from '../components/GoodsCard';

@connect(
    ({ goods }) => ({
        goods,
    }),
    dispatch => ({
        getGoods(title) {
            dispatch(getGoods(title));
        },
    })
)
class Goods extends BaseComponent {
    defaultProps = {
        goods: {
            mianmo: [],
            zhiniaoku: [],
            baoyou99: [],
            xihuqinjie: [],
            erjiermai: [],
            xuexiwenju: [],
            zhenxinzhentao: [],
            renqibaokuan: [],
            shujuxian: [],
            zhipinshijin: [],
        },
    };

    state = {
        search: '',
    };

    componentDidMount() {
        const { type } = this.$router.params;
        this.props.getGoods(type);
    }

    render() {
        const { search } = this.state;
        const { title, type } = this.$router.params;
        // 百度小程序第一次拿不到参数
        if (!type) return null;
        let goodslist = (this.props.goods || this.defaultProps.goods)[type];
        if (search) {
            goodslist = goodslist.filter(good => good.title.match(search)) || [];
        }
        return (
            <Container className={`Home-Goods ${this.props.className}`} noTab>
                <Header title={decodeURI(title)} back isActive />
                {/* search */}
                <View className="search flex-row-center-center">
                    <View className="content flex-row-start-center">
                        <IconFont name="sousuo" size={40} color="rgba(146, 143, 140, 1)" />
                        <Input
                            onInput={value => {
                                this.setState({ search: value.detail.value });
                            }}
                            value={search}
                            placeholder="请输入相关产品的关键词"
                            className="input"
                        />
                    </View>
                </View>
                {/* list */}
                <View className="flex-column list">
                    {goodslist.map(good => (
                        <GoodsCard data={good} type={type} />
                    ))}
                    {!goodslist.length && <Text className="nomore">暂无更多</Text>}
                </View>
            </Container>
        );
    }
}

export default Goods;
