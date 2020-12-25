import { View, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import BaseComponent from '../../../components/BaseComponent';
import IconFont from '../../../components/iconfont';
import Login from '../../login/Login';
import { setUserInfo } from '../../../actions/login';

@connect(
    ({ cases }) => ({
        cases,
    }),
    dispatch => ({
        setUserInfo(info) {
            dispatch(setUserInfo(info));
        },
    })
)
class CaseDetail extends BaseComponent {
    state = { showLogin: false };
    render() {
        const { id } = this.$router.params;
        const { showLogin } = this.state;
        if (!id) return null;
        const msg = this.props.cases.find(msg => msg.id - 0 === id - 0) || {};
        return (
            <Container className={`Example-CaseDetail ${this.props.className}`}>
                <Header title="案例" back />
                <View className="box">
                    {Object.keys(msg.routeParams).map((item, key) => (
                        <View
                            className={`flex-row-start-center item ${
                                Object.keys(msg.routeParams).length - 1 === key ? 'item-no-border' : ''
                            }`}
                            key={item}
                        >
                            <Text className="item-title">{item}</Text>
                            <Text className="subtitle">{msg.routeParams[item]}</Text>
                        </View>
                    ))}
                </View>
                {/* <View
                    className="flex-row-center-center login"
                    onClick={() => {
                        this.setState({ showLogin: true });
                    }}
                >
                    <Text className="login-text">点击咨询我们</Text>
                </View> */}
                {showLogin ? (
                    <Login
                        setUserInfo={this.props.setUserInfo}
                        onClose={() => {
                            this.setState({ showLogin: false });
                        }}
                    />
                ) : null}
            </Container>
        );
    }
}

export default CaseDetail;
