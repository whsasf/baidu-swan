import Taro from '@tarojs/taro';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getVideos } from '../../actions/video';
import { getCase } from '../../actions/case';
import Header from '../../components/Header';
import Container from '../../components/Container';
import BaseComponent from '../../components/BaseComponent';
import GLOBAL from '../../service/global';

@connect(
    ({ videos, cases, userinfo }) => ({
        videos,
        cases,
        userinfo,
    }),
    dispatch => ({
        getVideos() {
            dispatch(getVideos());
        },
        getCase() {
            dispatch(getCase());
        },
    })
)
class Example extends BaseComponent {
    state = { scrollHeight: 0 };
    defaultProps = {
        videos: {
            hot: [],
        },
    };

    componentDidMount = async () => {
        const height = await GLOBAL.calculateHeight({ hasTab: true });
        this.setState({
            scrollHeight: height,
        });
        this.props.getCase();
        this.props.getVideos();
    };

    utilSliceArr = arr => {
        const ret = [];
        for (let i = 0; i < arr.length; i += 2) {
            ret.push(arr.slice(i, i + 2));
        }
        return ret;
    };

    // 案例点击
    onCaseClick = id => {
        if (id) {
            Taro.navigateTo({ url: `pages/example/case/CaseDetail?id=${id}` });
        } else {
            Taro.navigateTo({ url: 'pages/example/case/Case' });
        }
    };

    render() {
        const { cases = [] } = this.props;
        const { scrollHeight } = this.state;
        return (
            <Container className={`Example ${this.props.className}`}>
                <Header title="成功案例" />
                {/* 用户列表 */}
                <ScrollView style={{ height: scrollHeight + 'px' }} scrollY>
                    <View className="flex-column userlist">
                        {cases.map(user => (
                            <View
                                key={user.id}
                                className="flex-row-start-center user"
                                onClick={() => {
                                    this.onCaseClick(user.id);
                                }}
                            >
                                <Image className="avatar" src={user.tbpic} mode="widthFix" />
                                <Text className="flex1 username">{user.title}</Text>
                                <View className="button flex-row-center-center">
                                    <Text className="text">点击查看</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

export default Example;
