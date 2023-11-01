import React, { useEffect, useRef, useState } from 'react';
import extend from 'extend';
import { Box } from '@mui/material';
import { stardust } from '@nebula.js/stardust';
import { IListLayout } from '../hooks/types';
import type { IStores } from '../store';
import uid from '../utils/uid';
import { IEnv } from '../types/types';
import useDirectQuery from '../hooks/direct-query/use-direct-query';

interface ListboxContainerProps {
  layout: IListLayout;
  model: EngineAPI.IGenericObject;
  borderBottom?: boolean;
  handleActive?: (id: string, active: boolean) => void;
  stores: IStores;
  closePopover?: () => void;
  isPopover?: boolean;
}

const ListboxContainer = ({
  layout, model, borderBottom, handleActive, stores, closePopover, isPopover,
}: ListboxContainerProps) => {
  const [listboxInstance, setListboxInstance] = useState<stardust.FieldInstance>();
  const elRef = useRef<HTMLElement>();
  const [inSelection, setInSelection] = useState(false);

  const {
    embed,
    constraints,
    options,
    renderTracker,
    env,
    styles,
    directQueryEnabled,
    fpLayout,
  } = stores.store.getState();

  const { sense } = env as IEnv;
  const { components } = fpLayout || {};

  const dqOptionsOverrides = useDirectQuery({
    directQueryEnabled, layout, listBoxModel: model, constraints,
  });

  const showBorder = !sense || inSelection || styles?.stardustTheme?.getStyle('', '', '_cards');

  const [key] = useState(uid());

  useEffect(() => {
    if (!layout || !embed) {
      return;
    }
    embed.field(layout.qInfo).then((inst: stardust.FieldInstance) => {
      setListboxInstance(inst);
    });
  }, []);

  useEffect(() => {
    if (!elRef.current || !listboxInstance || !model) {
      return undefined;
    }

    const allowSelect = !constraints?.select && !constraints?.active;
    const listboxOptions = extend(true, {
      __DO_NOT_USE__: {
        selectDisabled: () => !allowSelect, // can we hook this into the selections api?
        focusSearch: isPopover,
      },
      direction: options?.direction,
      search: isPopover ? true : 'toggle' as stardust.SearchMode,
      isPopover,
      components,
    }, dqOptionsOverrides || {});

    // @ts-ignore
    listboxInstance.mount(elRef.current, listboxOptions).then(() => {
      renderTracker?.renderedCallback(key);
    });
    return () => {
      listboxInstance.unmount();
    };
  }, [elRef.current, listboxInstance, constraints, options?.direction]);

  useEffect(() => {
    if (!listboxInstance) {
      return undefined;
    }
    const handleActivate = () => {
      handleActive?.(layout.qInfo.qId, true);
      setInSelection(true);
    };
    const handleDeactivate = () => {
      handleActive?.(layout.qInfo.qId, false);
      closePopover?.();
      setInSelection(false);
    };
    listboxInstance.on?.('selectionActivated', handleActivate);
    listboxInstance.on?.('selectionDeactivated', handleDeactivate);

    return () => {
      listboxInstance.removeListener?.('selectionActivated', handleActivate);
      listboxInstance.removeListener?.('selectionDeactivated', handleDeactivate);
    };
  }, [listboxInstance]);

  return (
    <Box
      height='100%'
      border={showBorder ? '1px solid #d9d9d9' : '1px solid transparent'}
      borderBottom={(showBorder && borderBottom) ? '1px solid #d9d9d9' : 0}
      borderRadius='4px'
      overflow='hidden'
      ref={elRef}
      data-testid="filterpane-listbox-container"
    />
  );
};

export default ListboxContainer;
