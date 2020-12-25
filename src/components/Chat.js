import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import BaseComponent from './BaseComponent';
import './Chat.scss';

export default class Chat extends BaseComponent {
    render() {
        const { openType, className, onClick, onContact, appParameter } = this.props;
        return (
            <Button
                className={`Chat ${className || ''}`}
                open-type={openType}
                app-parameter={appParameter}
                onClick={() => {
                    onClick && onClick();
                }}
                onContact={e => {
                    onContact && onContact();
                }}
            >
                {this.props.children}
            </Button>
        );
    }
}
