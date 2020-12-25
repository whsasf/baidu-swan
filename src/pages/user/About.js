import { RichText } from '@tarojs/components';
import Header from '../../components/Header';
import Container from '../../components/Container';
import BaseComponent from '../../components/BaseComponent';

class About extends BaseComponent {
    getText = () => {
        return `我司成立于2015年10月。现公司在职员工200人，办公面积达到2000平。公司管理层由以技术背景为主的80后组成，是一个年轻且富有创造力的团队。

        公司成立以来一直保持稳定运营，经营状况良好。

        目前公司的主打产品是店宝宝。个人网店是目前以及未来的趋势，我们的店宝宝软件也孕育而生，定位于个人开网店市场。

        店宝宝主要通过提供工具、货源、培训等服务，帮助淘宝普通大众卖家开店。在开发工具权限方面，我们和阿里签约，为我们公司软件开发平台提供淘宝上任意店铺的商品、订单等管理权限，实现了自动化开店，使开店操作更加简单，实现人人都能开网店的目标。
        `;
    };
    render() {
        return (
            <Container className={`User-About ${this.props.className}`} noTab>
                <Header title="关于我们" back />
                <RichText
                    className="article"
                    nodes={this.getText()
                        .split('\n')
                        .join('<br/>')}
                />
            </Container>
        );
    }
}

export default About;
