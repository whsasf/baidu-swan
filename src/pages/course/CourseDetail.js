import { View, Text, Image, Video } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Header from '../../components/Header';
import Container from '../../components/Container';
import BaseComponent from '../../components/BaseComponent';
import Chat from '../../components/Chat';

@connect(({ videos }) => ({
    videos,
}))
class CourseDetail extends BaseComponent {
    state = {
        id: 0,
        isList: true,
    };

    timeUtil = sec => {
        const min = Math.floor(sec / 60);
        const secend = Math.floor(sec - min * 60) + '';
        return `${min}:${secend.padStart(2, '0')}`;
    };

    onTabChange = () => {
        this.setState({ isList: !this.state.isList });
    };

    render() {
        const { type, seriesid } = this.$router.params;
        if (!type) return null;
        const { id, isList } = this.state;
        const { detail, image } = this.props.videos[type].find(v => v.seriesid == seriesid) || {
            detail: [{ videos: [{ info: '' }] }],
        };
        let currentVideo = {};
        if (id === 0) {
            currentVideo = detail[0].videos[0];
        } else {
            detail.forEach(v => {
                const exit = v.videos.find(video => video.id - 0 === id - 0);
                if (exit) currentVideo = exit;
            });
        }
        console.log('detail', image);
        return (
            <Container className={`Course-Detail ${this.props.className}`} noTab>
                <Header title="课程视频" back />
                {/* <Video
                    className="video"
                    src={currentVideo.info}
                    controls={true}
                    autoplay={true}
                    initialTime="0"
                    id="video"
                    loop={false}
                    muted={false}
                /> */}
                <Image src={image} className="cover1" mode="widthFix" />
                {/* tabs */}
                <View className="tabs flex-row">
                    <View className="flex1 flex-row-center-center" onClick={this.onTabChange}>
                        <View className={`tab ${isList ? 'tab-active' : ''}`}>
                            <Text className="text">课程目录</Text>
                        </View>
                    </View>
                    <View className="flex1 flex-row-center-center" onClick={this.onTabChange}>
                        <View className={`tab ${!isList ? 'tab-active' : ''}`}>
                            <Text className="text">相关课程</Text>
                        </View>
                    </View>
                </View>
                {/* list */}
                <View className="flex-column flex1">
                    {isList ? (
                        <View>
                            {detail.map(capter => (
                                <View className="list flex-column" key={capter.chaptername}>
                                    <View className="header">
                                        <Text className="text">{capter.chaptername}</Text>
                                    </View>
                                    {capter.videos.map(video => (
                                        <Chat
                                            key={video.id}
                                            className="item flex-row"
                                            onClick={() => {
                                                if (video.info.indexOf('mp4') > -1) {
                                                    this.setState({ id: video.id });
                                                } else {
                                                    // 跳转其他页面
                                                }
                                            }}
                                            openType={video.info.indexOf('mp4') > -1 ? undefined : 'contact'}
                                        >
                                            <Text
                                                className={`title ${
                                                    video.id - 0 == currentVideo.id - 0 ? 'title-active' : ''
                                                }`}
                                            >
                                                {video.title}
                                            </Text>
                                            <Text className="time">{this.timeUtil(video.duration)}</Text>
                                        </Chat>
                                    ))}
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Image src={currentVideo.desc_images} className="detailimage" mode="widthFix" />
                    )}
                </View>
            </Container>
        );
    }
}

export default CourseDetail;
