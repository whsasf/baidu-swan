/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Iconzixun1 = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M815.16864 880.704V133.824A133.248 133.248 0 0 0 682.81664 0H138.43264A133.248 133.248 0 0 0 6.08064 133.824v756.288a133.248 133.248 0 0 0 132.352 133.824h677.632v-143.104zM191.04064 262.208h59.136v-59.776a40.512 40.512 0 1 1 81.024 0v59.712h59.136a40.96 40.96 0 1 1 0 81.92H331.20064v59.712a40.512 40.512 0 1 1-81.024 0v-59.712H191.04064a40.96 40.96 0 0 1 0-81.856z m423.168 597.248H191.04064a40.96 40.96 0 1 1 0-81.92h423.168a40.96 40.96 0 1 1 0 81.92z m0-180.352H316.67264a40.96 40.96 0 1 1 0-81.92h297.536a40.96 40.96 0 1 1 0 81.92z m0-183.872H471.29664a40.96 40.96 0 1 1 0-81.92h142.912a40.96 40.96 0 1 1 0 81.92z m317.248-138.56h-49.216V1024h6.4v-0.64a142.976 142.976 0 0 0 129.472-142.784V444.032a86.912 86.912 0 0 0-86.4-87.36z"
        fill={getIconColor(color, 0, '#5288F5')}
      />
    </svg>
  );
};

Iconzixun1.defaultProps = {
  size: 18,
};

export default Iconzixun1;
