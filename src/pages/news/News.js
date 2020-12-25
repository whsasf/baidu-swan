import { connect } from '@tarojs/redux';
import { ScrollView, View, Text } from '@tarojs/components';
import { getArticles } from '../../actions/article';
import Header from '../../components/Header';
import Container from '../../components/Container';
import BaseComponent from '../../components/BaseComponent';
import NewsCard from './components/NewsCard';
import GLOBAL from '../../service/global';

@connect(
    ({ article }) => ({
        article,
    }),
    dispatch => ({
        addArctile(page, type) {
            dispatch(getArticles(page, type));
        },
    })
)
class News extends BaseComponent {
    page = 1;
    state = {
        scrollHeight: 1000,
        types: [
            // { name: '白领', value: 'bailin' },
            // { name: '创业', value: 'chuangye' },
            // { name: '学生', value: 'xuesheng' },
            // { name: '宝妈', value: 'baoma' },
            // { name: '打工', value: 'dagong' },
            // { name: '生意', value: 'shengyi' },
            // { name: '赚钱思维', value: 'zhuanqiansiwei' },
            // { name: '兼职', value: 'jianzhi' },
            // { name: '农村', value: 'nongcun' },
            // { name: '网店', value: 'wangdian' },
            { name: '白领', value: 'bailin' },
            { name: '学生', value: 'xuesheng' },
            { name: '宝妈', value: 'baoma' },
            { name: '待业者', value: 'daiyezhe' },
            { name: '程序员', value: 'chengxuyuan' },
            { name: '赚钱思维', value: 'zhuanqiansiwei' },
            { name: '自媒体', value: 'zimeiti' },
            { name: '农村', value: 'nongcun' },
            { name: '微商', value: 'weishang' },
            { name: '淘宝客', value: 'taobaoke' },
        ],
        activeTypes: 0,
    };

    componentDidMount = async () => {
        this.getData();
        // 获取滚动高度
        this.rate = await GLOBAL.rate();
        this.statusBarHeight = await GLOBAL.statusBarHeight();
        const height = await GLOBAL.calculateHeight({ hasTab: true, staticHeight: 100 });
        this.setState({
            scrollHeight: height,
        });
    };

    getData = () => {
        const { types, activeTypes } = this.state;
        this.props.addArctile(this.page, types[activeTypes].value);
    };

    loadMore = () => {
        this.page += 1;
        this.getData();
    };

    render() {
        const { scrollHeight, types, activeTypes } = this.state;
        const { article = [], show } = this.props;
        console.log('article',article)
        if (!show) return null;
        return (
            <Container className={`News ${this.props.className}`}>
                <Header title="赚钱方法" line={true} />
                <View className="navBox" style={{ overflowX: 'scroll', overflowY: 'hidden' }}>
                    <ScrollView scrollX className="nav" scrollY={false}>
                        {types.map((item, index) => (
                            <View
                                key={item.name}
                                className="item"
                                onClick={() => {
                                    if (activeTypes !== index) {
                                        this.scrollTop = 0;
                                        this.page = 1;
                                        this.setState({ activeTypes: index }, () => {
                                            this.getData();
                                        });
                                    }
                                }}
                            >
                                <View className="item-content">
                                    <Text className={`item-text ${index === activeTypes ? 'item-active' : ''}`}>
                                        {item.name}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    <View
                        className="nav-shadow"
                        style={
                            this.statusBarHeight
                                ? { top: this.statusBarHeight + this.rate * (88 + 12) + 'px' }
                                : { zIndex: 1 }
                        }
                    />
                </View>
                <ScrollView
                    className="scrollview"
                    scrollY
                    style={{ height: scrollHeight + 'px' }}
                    scrollWithAnimation
                    lowerThreshold={200}
                    onScrollToLower={this.loadMore}
                    scrollTop={this.scrollTop || 0}
                    onScroll={e => {
                        this.scrollTop = e.detail.scrollTop;
                    }}
                >
                    {article.map(info => (
                        <NewsCard data={info} key={info.id} type={types[activeTypes].value} />
                    ))}
                </ScrollView>
            </Container>
        );
    }
}

export default News;
