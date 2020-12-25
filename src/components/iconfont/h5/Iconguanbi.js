/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Iconguanbi = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M591.530667 512l417.109333-417.109333a54.613333 54.613333 0 0 0 0-76.8l-2.304-2.304a54.613333 54.613333 0 0 0-76.8 0L512.426667 433.493333 95.317333 15.786667a54.613333 54.613333 0 0 0-76.8 0L16.213333 18.090667a53.589333 53.589333 0 0 0 0 76.8L433.322667 512 16.213333 929.109333a54.613333 54.613333 0 0 0 0 76.8l2.304 2.304a54.613333 54.613333 0 0 0 76.8 0l417.109334-417.109333 417.109333 417.109333a54.613333 54.613333 0 0 0 76.8 0l2.304-2.304a54.613333 54.613333 0 0 0 0-76.8z"
        fill={getIconColor(color, 0, '#8F8F8F')}
      />
    </svg>
  );
};

Iconguanbi.defaultProps = {
  size: 18,
};

export default Iconguanbi;
