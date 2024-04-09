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
  switch (type) {
    case 'H': return (
        <Tooltip title={translator?.get('Listbox.DrillDown')} enterDelay={delay}>
          <div>
            <DrillDown style={style} />
          </div>
        </Tooltip>
    );
    case 'C': return (
      <Tooltip title={translator?.get('Listbox.Cyclic')} enterDelay={delay}>
      <div>
        <Cyclic style={style} />
      </div>
    </Tooltip>);
    default:
      return undefined;
  }
};

export default DimensionIcon;
