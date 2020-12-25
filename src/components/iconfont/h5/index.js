/* eslint-disable */

import Iconjijin from './Iconjijin';
import Iconhuore from './Iconhuore';
import Iconkecheng from './Iconkecheng';
import Iconanli1 from './Iconanli1';
import Iconzixun1 from './Iconzixun1';
import Iconfanhui from './Iconfanhui';
import Iconjieshao from './Iconjieshao';
import Iconguanbi from './Iconguanbi';
import Iconanli from './Iconanli';
import Iconzixun from './Iconzixun';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'jijin':
      return <Iconjijin {...rest} />;
    case 'huore':
      return <Iconhuore {...rest} />;
    case 'kecheng':
      return <Iconkecheng {...rest} />;
    case 'anli1':
      return <Iconanli1 {...rest} />;
    case 'zixun1':
      return <Iconzixun1 {...rest} />;
    case 'fanhui':
      return <Iconfanhui {...rest} />;
    case 'jieshao':
      return <Iconjieshao {...rest} />;
    case 'guanbi':
      return <Iconguanbi {...rest} />;
    case 'anli':
      return <Iconanli {...rest} />;
    case 'zixun':
      return <Iconzixun {...rest} />;

  }

  return null;
};

export default IconFont;
