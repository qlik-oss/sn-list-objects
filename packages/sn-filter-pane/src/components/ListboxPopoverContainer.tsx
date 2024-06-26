import {
  Grid, PaperProps, Popover, styled,
} from '@mui/material';
import React, { useState, useRef } from 'react';
import { IListboxResource } from '../hooks/types';
import type { IStores } from '../store';
import { ExpandButton } from './ExpandButton';
import { FoldedListbox } from './FoldedListbox';
import { FoldedListboxClickEvent } from './FoldedListbox/FoldedListbox';
import ListboxContainer from './ListboxContainer';
import KEYS from './keys';
import { IEnv } from '../types/types';
import { IStyles } from '../hooks/types/components';

export interface FoldedPopoverProps {
  resources: IListboxResource[];
  stores: IStores;
}

const getPopoverPaperProps = (selectedResource: boolean, isSmallDevice: boolean, styles?: IStyles): PaperProps => {
  const backgroundColor = styles?.popover.backgroundColor;
  const calcHeight = isSmallDevice ? '100%' : '330px';
  return {
    style: {
      overflowX: 'hidden',
      overflowY: selectedResource ? 'hidden' : 'auto',
      backgroundColor,
      ...(isSmallDevice ? {
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
      }
        : {
          height: selectedResource ? calcHeight : undefined,
          width: '234px',
          maxWidth: 'calc(100% - 32px)',
          maxHeight: 'calc(100% - 32px)',
        }),
    },
  };
};

const StyledDiv = styled('div')(() => ({
  '&:focus:not(:hover)': {
    outline: '2px solid #3F8AB3',
    outlineOffset: '-2px',
    borderRadius: '4px',

  },
  '&:focus-visible': {
    outline: 'none',
  },
}));

const StyledPopover = styled(Popover, { shouldForwardProp: (p: string) => !['isSmallDevice'].includes(p) })(({ isSmallDevice }: { isSmallDevice: boolean }) => ({
  '& .MuiPopover-paper': isSmallDevice ? {
    // Override the top, left so the popover won't irrevocably go outside the viewport.
    top: '0px !important',
    left: '0px !important',
  } : {},
}));

/**
 * If a single resource is passed to this component a FoldedListbox is rendered.
 * When the FoldedListbox is clicked, a Listbox is rendered in a Popover.
 * If 2 or more resources are passed, an ExpandButton is rendered with a number that
 * tells the user how many Listboxes are hidden. If the ExpandButton is clicked a list of
 * FoldedLisbox:es are rendered which in themselves are clickable.
 */
export const ListboxPopoverContainer = ({ resources, stores }: FoldedPopoverProps) => {
  const { constraints, styles, env = {} } = stores.store.getState();
  const { sense } = env as IEnv;
  const [popoverOpen, setPopoverOpen] = useState(false);
  const containerRef = useRef(null);
  const [selectedResource, setSelectedResource] = useState<IListboxResource | undefined>();
  const transitionDuration = 200;
  const isSmallDevice = sense?.isSmallDevice?.() ?? false;

  const handleOpen = ({ event }: FoldedListboxClickEvent | { event: React.MouseEvent<HTMLButtonElement, MouseEvent> }) => {
    if (event.currentTarget.contains(event.target as Node) && !constraints?.active) {
      setPopoverOpen(true);
    }
  };
  const handleClose = () => {
    setPopoverOpen(false);
    setTimeout(() => {
      setSelectedResource(undefined);
    }, transitionDuration);
  };

  const closePopover = () => {
    handleClose();
  };

  const isSingle = resources.length === 1;

  const selectResource = ({ resource }: FoldedListboxClickEvent) => {
    setSelectedResource(resource);
  };

  if (resources.length === 1 && !selectedResource) {
    setSelectedResource(resources[0]);
  }

  const onEscape = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLElement | undefined;
    target?.setAttribute('tabIndex', '-1');
    // Then it propagates to the top-level (i.e. to filter pane)
  };

  const changeFocus = () => {
    const currentActive = document.activeElement as HTMLElement;
    const listbox = currentActive?.querySelector('.listbox-container,.folded-listbox');
    if (listbox) {
      currentActive.setAttribute('tabIndex', '-1');
      listbox?.setAttribute('tabIndex', '-1');
      (listbox as HTMLElement)?.focus();
    }
  };

  const onListboxPopoverContainerKeyDown = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT') {
      return;
    }
    switch (event.key) {
      case KEYS.ESC:
        onEscape(event);
        break;
      case KEYS.ENTER:
        // @ts-ignore
        handleOpen({ event });
        setTimeout(changeFocus, 500);
        break;
      case KEYS.LEFT:
      case KEYS.RIGHT:
        return; // let it propagate to top-level
      default:
        return;
    }

    // Note: We should not stop propagation here as it will block the containing app
    // from handling keydown events.
    event.preventDefault();
  };

  const onFoldedListboxDropdownEnter = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('folded-listbox')) {
      setTimeout(changeFocus, 500);
      return;
    }
    const firstFoldedListbox: HTMLElement = target.querySelector('.folded-listbox') as HTMLElement;
    target.setAttribute('tabIndex', '-1');
    firstFoldedListbox?.setAttribute('tabIndex', '-1');
    firstFoldedListbox?.focus();
  };

  const findIndex = (element: EventTarget, nodeList: NodeList) => {
    for (let i = 0; i < nodeList.length; i++) {
      if (element === nodeList.item(i)) return i;
    }
    return -1;
  };

  const moveToNextFoldedListboxItem = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.folded-listbox-dropdown');
    const foldedListboxList = dropdown?.querySelectorAll('.folded-listbox');
    if (foldedListboxList?.length) {
      const activeIndex = findIndex(event.target, foldedListboxList);
      if (activeIndex < 0) {
        return;
      }
      const nextIndex = event.key === KEYS.UP ? activeIndex - 1 : activeIndex + 1;
      if (nextIndex < 0 || nextIndex >= foldedListboxList.length) {
        return;
      }
      const elementToFocus = foldedListboxList.item(nextIndex);
      if (elementToFocus) {
        target?.setAttribute('tabIndex', '-1');
        elementToFocus.setAttribute('tabIndex', '-1');
        (elementToFocus as HTMLElement).focus();
      }
    }

    const firstFoldedListbox: HTMLElement = target.querySelector('.folded-listbox') as HTMLElement;
    target.setAttribute('tabIndex', '-1');
    firstFoldedListbox?.setAttribute('tabIndex', '-1');
    firstFoldedListbox?.focus();
  };

  const onFoldedListboxDropdownKeyDown = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT') {
      return;
    }
    switch (event.key) {
      case KEYS.ESC:
        onEscape(event);
        handleClose();
        break;
      case KEYS.ENTER:
        onFoldedListboxDropdownEnter(event);
        break;
      case KEYS.UP:
      case KEYS.DOWN:
        moveToNextFoldedListboxItem(event);
        break; // let it propagate to top-level
      default:
        return;
    }
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <StyledDiv ref={containerRef} className='listbox-popover-container' onKeyDown={onListboxPopoverContainerKeyDown}>
      {isSingle && !resources[0].alwaysExpanded
        ? <FoldedListbox onClick={handleOpen} resource={resources[0]} stores={stores} />
        : <ExpandButton onClick={handleOpen} opened={popoverOpen} stores={stores} />}
      <StyledPopover
        open={popoverOpen}
        onClose={handleClose}
        anchorEl={containerRef.current}
        transitionDuration={transitionDuration}
        isSmallDevice={isSmallDevice}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        slotProps={{
          paper: getPopoverPaperProps(!!selectedResource, isSmallDevice, styles),
        }}
        anchorReference={isSmallDevice ? 'anchorPosition' : 'anchorEl'}
        anchorPosition= {{ left: 0, top: 0 }}
        marginThreshold={isSmallDevice ? 0 : 16}
        className='listbox-popover'
      >
        {(selectedResource || isSingle)
          ? <ListboxContainer model={selectedResource?.model} layout={selectedResource?.layout ?? resources[0].layout} stores={stores} closePopover={closePopover} isPopover={true} />
          : <Grid container direction='column' spacing={1} padding='8px' className='folded-listbox-dropdown' onKeyDown={onFoldedListboxDropdownKeyDown}>
            {!!resources?.length && resources?.map((resource) => (
              <Grid item key={resource.id}>
                <FoldedListbox onClick={selectResource} resource={resource} stores={stores} isInPopover />
              </Grid>
            ))}
          </Grid>
        }
      </StyledPopover>
    </StyledDiv>
  );
};
