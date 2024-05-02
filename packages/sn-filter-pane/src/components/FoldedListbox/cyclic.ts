import { SVGProps } from 'react';
import SvgIcon from './SvgIcon';

const cyclic = (props: SVGProps<SVGElement>) => ({
  ...props,
  shapes: [
    {
      type: 'path',
      attrs: {
        d: 'M6 2h10V1H6zm5 5h5V6h-5zm5 5h-5v-1h5zM5 10h1v2.663a3.5 3.5 0 1 0-2.922.036l-.406.914A4.501 4.501 0 1 1 7.329 13H9v1H5z',
      },
    },
  ],
});
export default (props: SVGProps<SVGElement>) => SvgIcon(cyclic(props));
export { cyclic };
