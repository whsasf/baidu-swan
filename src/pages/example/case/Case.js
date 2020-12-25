import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import BaseComponent from '../../../components/BaseComponent';
import CaseList from '../components/CaseList';

@connect(
    ({ cases }) => ({
        cases,
    }),
    dispatch => ({
        add() {
            dispatch(add());
        },
        dec() {
            dispatch(minus());
        },
        asyncAdd() {
            dispatch(asyncAdd());
        },
    })
)
class Case extends BaseComponent {
    static options = {
        addGlobalClass: true,
    };
    state = {
        userlist: [
            {
                avatar: '',
                username: '李先生',
                price: 10,
                date: '2020-05-20',
            },
            {
                avatar: '',
                username: '李先生',
                price: 10,
                date: '2020-05-20',
            },
            {
                avatar: '',
                username: '李先生',
                price: 10,
                date: '2020-05-20',
            },
            {
                avatar: '',
                username: '李先生',
                price: 10,
                date: '2020-05-20',
            },
            {
                avatar: '',
                username: '李先生',
                price: 10,
                date: '2020-05-20',
            },
        ],
    };

    handleClick = value => {
        this.setState({
            current: value,
        });
    };

    render() {
        const { cases } = this.props;
        if (!cases) return null;
        return (
            <Container className={`Home-Case ${this.props.className}`} noTab>
                <Header title="案例" back isActive />
                <View className="list">
                    {cases.map(user => (
                        <CaseList data={user} />
                    ))}
                </View>
            </Container>
        );
    }
}

export default Case;
