import { Tooltip } from '@mui/material';
import React from 'react';
import { stardust } from '@nebula.js/stardust';
import DrillDown from './drillDown';
import Cyclic from './cyclic';

interface Props {
    isRtl: boolean;
    translator?: stardust.Translator;
    type: string;
}

const DimensionIcon = ({
  type, translator, isRtl,
}: Props) => {
  const delay = 2000;
  const style = { fontSize: '12px', padding: isRtl ? '0 0 0 6px' : '0 6px 0 0' };
  let title;
  let icon;
  switch (type) {
    case 'H':
      icon = (<DrillDown style={style} />);
      title = translator?.get('Listbox.DrillDown');
      break;
    case 'C':
      icon = (<Cyclic style={style} />);
      title = translator?.get('Listbox.Cyclic');
      break;
    default:
      return undefined;
  }
  return (<Tooltip title={title} enterDelay={delay}>
      <div>
        {icon}
      </div>
    </Tooltip>);
};

export default DimensionIcon;
