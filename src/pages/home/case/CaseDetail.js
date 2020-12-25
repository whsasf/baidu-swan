import { View, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import BaseComponent from '../../../components/BaseComponent';
import IconFont from '../../../components/iconfont';

@connect(({ cases }) => ({
    cases,
}))
class CaseDetail extends BaseComponent {
    render() {
        const { id } = this.$router.params;
        if (!id) return null;
        const msg = this.props.cases.find(msg => msg.id - 0 === id - 0) || {};
        return (
            <Container className={`Home-CaseDetail ${this.props.className}`}>
                <Header title="案例" back />
                <View className="bg1">
                    <View className="item">
                        <Text className="title">1</Text>
                        <Text className="subtitle">1</Text>
                    </View>
                </View>
                <View className="bg">
                    <View className="card flex-column">
                        <View className="user flex-row">
                            <Image className="avatar" src={msg.avatar} />
                            <View className="msg flex-column-center">
                                <View className="flex-row-start-center">
                                    <Text className="name">{msg.username}</Text>
                                    <Text className="subname">{msg.tag}</Text>
                                </View>
                                <Text className="price">当前月销售额 {msg.count}+</Text>
                            </View>
                            <IconFont name="zu2735" color="rgba(255, 202, 39, 1)" size={61} />
                        </View>
                        <View className="line" />
                        <View className="content flex-column">
                            <Text className="title">{msg.title}</Text>
                            <Text className="text">{msg.content}</Text>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}

export default CaseDetail;
