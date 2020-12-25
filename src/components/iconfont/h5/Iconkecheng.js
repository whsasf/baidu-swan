/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Iconkecheng = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M960 294.016V896a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128h768v160H294.016a70.4 70.4 0 0 0-49.024 20.992 71.36 71.36 0 0 0 0 99.008 70.4 70.4 0 0 0 49.024 20.992h358.976v262.08a85.824 85.824 0 0 1 9.536 2.496 10.112 10.112 0 0 0 9.536-2.496l76.8-56.96a41.152 41.152 0 0 1 18.496-4.992 18.56 18.56 0 0 1 13.504 4.992l76.8 56.96h6.016a12.224 12.224 0 0 0 9.024-4.032 12.8 12.8 0 0 0 4.032-9.024v-256z"
        fill={getIconColor(color, 0, '#CCD7F2')}
      />
    </svg>
  );
};

Iconkecheng.defaultProps = {
  size: 18,
};

export default Iconkecheng;
