/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Iconzixun = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M413.504 630.144H255.936a39.424 39.424 0 0 0 0 78.784h157.568a39.424 39.424 0 1 0 0-78.784z m196.928-196.928H256a39.424 39.424 0 0 0 0 78.784h354.432a39.424 39.424 0 1 0 0-78.784z m0-196.928H256a39.424 39.424 0 0 0 0 78.784h354.432a39.424 39.424 0 1 0 0-78.784z"
        fill={getIconColor(color, 0, '#FF6314')}
      />
      <path
        d="M846.72 196.928v-39.36A158.016 158.016 0 0 0 689.216 0h-512A158.016 158.016 0 0 0 19.648 157.568v708.928A158.016 158.016 0 0 0 177.216 1024h669.568a158.016 158.016 0 0 0 157.568-157.568v-512a158.016 158.016 0 0 0-157.632-157.504z m78.784 669.568a78.976 78.976 0 0 1-78.784 78.784H177.216a78.976 78.976 0 0 1-78.784-78.784V157.568a78.976 78.976 0 0 1 78.784-78.784h512a78.976 78.976 0 0 1 78.784 78.784v590.784a39.424 39.424 0 0 0 78.784 0V275.712a78.976 78.976 0 0 1 78.784 78.784z"
        fill={getIconColor(color, 1, '#FF6314')}
      />
    </svg>
  );
};

Iconzixun.defaultProps = {
  size: 18,
};

export default Iconzixun;
