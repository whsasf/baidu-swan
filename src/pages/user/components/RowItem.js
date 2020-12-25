import { View, Text } from '@tarojs/components';
import IconFont from '../../../components/iconfont';
import BaseComponent from '../../../components/BaseComponent';
import Chat from '../../../components/Chat';

export default class RowItem extends BaseComponent {
    render() {
        const { data = [] } = this.props;
        return (
            <View className="User-RowItem flex-column">
                {data.map(item => (
                    <Chat
                        openType={item.openType}
                        className="flex-row-between-center item"
                        onClick={() => {
                            item.onClick && item.onClick();
                        }}
                        onContact={() => {
                            item.onContact && item.onContact();
                        }}
                    >
                        <View className="flex-row-start-center">
                            <IconFont name={item.icon} size={32} color={item.iconColor} />
                            <Text className="title">{item.title}</Text>
                        </View>
                        <IconFont name="gengduo1" color="rgba(201, 201, 201, 1)" size={30} />
                    </Chat>
                ))}
            </View>
        );
    }
}
