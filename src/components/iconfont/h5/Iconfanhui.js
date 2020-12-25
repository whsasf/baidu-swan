/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Iconfanhui = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1553 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M513.4112 1023.936a49.408 49.408 0 0 1-35.008-14.528L14.9152 545.92a49.536 49.536 0 0 1 70.08-70.08l463.488 463.488a49.536 49.536 0 0 1-35.008 84.608z"
        fill={getIconColor(color, 0, '#756A6A')}
      />
      <path
        d="M51.0112 560.448a49.536 49.536 0 0 1-35.008-84.608L477.3792 14.464a49.536 49.536 0 0 1 70.08 70.08L86.0832 545.92a49.408 49.408 0 0 1-35.072 14.528z"
        fill={getIconColor(color, 1, '#756A6A')}
      />
      <path
        d="M1503.8752 561.024H50.3712a49.536 49.536 0 1 1 0-99.136h1453.504a49.536 49.536 0 1 1 0 99.136z"
        fill={getIconColor(color, 2, '#756A6A')}
      />
    </svg>
  );
};

Iconfanhui.defaultProps = {
  size: 18,
};

export default Iconfanhui;
