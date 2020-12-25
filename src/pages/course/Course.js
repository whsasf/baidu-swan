import { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getVideos } from '../../actions/video';
import Header from '../../components/Header';
import Container from '../../components/Container';
import VideoCard from './components/VideoCard';

@connect(
    ({ videos }) => ({
        videos,
    }),
    dispatch => ({
        getVideos(type) {
            dispatch(getVideos(type));
        },
    })
)
class Course extends Component {
    static options = {
        addGlobalClass: true,
    };

    defaultProps = {
        videos: {
            hot: [],
            design: [],
            promote: [],
            activities: [],
            cases: [],
        },
    };

    state = {
        current: 0,
        tabs: [
            { title: '设计类', type: 'design' },
            { title: '推广类', type: 'promote' },
            { title: '活动类', type: 'activities' },
            { title: '案例实操', type: 'cases' },
        ],
    };

    componentDidMount = () => {
        this.getVideoList();
    };

    getVideoList = (current = 0) => {
        const { tabs } = this.state;
        this.props.getVideos(tabs[current].type);
    };

    onNavChange = index => {
        this.setState({ current: index });
        this.getVideoList(index);
    };

    render() {
        const { tabs, current } = this.state;
        const videos = this.props.videos || this.defaultProps.videos;
        const videolist = videos[tabs[current].type];
        if (!this.props.show) return null;
        return (
            <Container className={`Course ${this.props.className}`}>
                <Header title="课程教程" backgroundStyle={{ backgroundColor: 'rgba(255, 202, 39, 1)' }} line />
                {/* render navs */}
                <View className="nav flex-row-between-center">
                    {tabs.map((tab, index) => (
                        <View
                            key={tab.title}
                            className={`flex-row-center-center item ${index === current ? 'item-active' : ''}`}
                            onClick={() => {
                                this.onNavChange(index);
                            }}
                        >
                            <Text className={`text ${index === current ? 'text-active' : ''}`}>{tab.title}</Text>
                        </View>
                    ))}
                </View>
                <View className="videolist flex-column">
                    {videolist.map(video => (
                        <VideoCard data={video} key={video.id} type={tabs[current].type} />
                    ))}
                    {videolist.length ? null : (
                        <View className="flex-row-center-center">
                            <Text>暂无更多</Text>
                        </View>
                    )}
                </View>
            </Container>
        );
    }
}

Course.defaultProps = {};
export default Course;
