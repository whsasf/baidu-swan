/* eslint-disable */

import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Iconjijin = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512.244158 1024C336.309588 1024 97.079532 993.728246 48.119929 733.058364c-11.007911-63.551484-27.903773-279.42173 246.014002-391.612818 49.407599-29.887757 54.015561-49.471598 54.463557-55.039553a47.039618 47.039618 0 0 0-18.175852-30.271754 127.614963 127.614963 0 0 1-120.063025-134.398908 127.294966 127.294966 0 0 1 133.118919-121.599012 123.135 123.135 0 0 1 55.29555 13.631889 125.374981 125.374981 0 0 1 113.471078 0 125.374981 125.374981 0 0 1 113.087082 0 125.50298 125.50298 0 0 1 137.534882 17.919855 128.830953 128.830953 0 0 1 38.399688 134.398908 126.974968 126.974968 0 0 1-106.623134 89.599272 38.399688 38.399688 0 0 0-15.615873 24.319802c0 11.519906 13.951887 34.559719 54.463558 64.831473 188.158471 102.783165 269.629809 233.342104 241.790035 388.604843-33.855725 192.446436-189.56646 290.557639-463.036238 290.557639z m0-150.590776a42.431655 42.431655 0 0 0 42.239657-42.687654v-49.919594h84.415314a42.623654 42.623654 0 0 0 0-85.311307h-84.479313v-52.031577h126.974968a42.687653 42.687653 0 0 0 0-85.311307H597.043469l33.34373-42.623654a42.943651 42.943651 0 0 0-7.999935-59.711514 41.919659 41.919659 0 0 0-59.071521 8.127933l-51.199584 67.391453-50.623588-65.727466a41.919659 41.919659 0 0 0-59.07152-8.127934 43.391647 43.391647 0 0 0-7.999935 59.711515l33.343729 42.687653H343.47753a42.687653 42.687653 0 0 0 0 85.311307h126.334973v50.303591H385.653187a42.687653 42.687653 0 0 0 0 85.311307h84.159316v49.919594a42.431655 42.431655 0 0 0 42.175658 42.687654z"
        fill={getIconColor(color, 0, '#CCD7F2')}
      />
    </svg>
  );
};

Iconjijin.defaultProps = {
  size: 18,
};

export default Iconjijin;
