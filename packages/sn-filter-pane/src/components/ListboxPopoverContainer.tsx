import {
  Grid, PaperProps, Popover, Theme, styled,
} from '@mui/material';
import { stardust } from '@nebula.js/stardust';
import React, { useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { IListboxResource } from '../hooks/types';
import type { IStores } from '../store';
import { ExpandButton } from './ExpandButton';
import { FoldedListbox } from './FoldedListbox';
import { FoldedListboxClickEvent } from './FoldedListbox/FoldedListbox';
import ListboxContainer from './ListboxContainer';
import KEYS from './keys';

export interface FoldedPopoverProps {
  resources: IListboxResource[];
  stores: IStores;
}

const popoverPaperProps = (selectedResource: boolean, isSmallDevice:boolean, stardustTheme?: stardust.Theme, muiTheme?: Theme): PaperProps => {
  let backgroundColor = stardustTheme?.getStyle('object', '', 'filterpane.backgroundColor');
  const calcHeight = isSmallDevice ? '100%' : '330px';
  if (!backgroundColor || backgroundColor === 'transparent') {
    backgroundColor = muiTheme?.palette.background.default;
  }
  return {
    style: {
      height: selectedResource ? calcHeight : undefined,
      width: isSmallDevice ? '100%' : '234px',
      overflow: 'hidden',
      backgroundColor,
      maxWidth: isSmallDevice ? '100%' : 'calc(100% - 32px)',
      maxHeight: isSmallDevice ? '100%' : 'calc(100% - 32px)',
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
  padding: '2px',
  paddingBottom: '0px',
}));

/**
 * If a single resource is passed to this component a FoldedListbox is rendered.
 * When the FoldedListbox is clicked, a Listbox is rendered in a Popover.
 * If 2 or more resources are passed, an ExpandButton is rendered with a number that
 * tells the user how many Listboxes are hidden. If the ExpandButton is clicked a list of
 * FoldedLisbox:es are rendered which in themselves are clickable.
 */
export const ListboxPopoverContainer = ({ resources, stores }: FoldedPopoverProps) => {
  const { constraints, stardustTheme, sense } = stores.store.getState();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const containerRef = useRef(null);
  const [selectedResource, setSelectedResource] = useState<IListboxResource | undefined>();
  const transitionDuration = 200;
  const muiTheme = useTheme();
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
      {isSingle
        ? <FoldedListbox onClick={handleOpen} resource={resources[0]} stores={stores} />
        : <ExpandButton onClick={handleOpen} avatar={resources.length} opened={popoverOpen} stores={stores} />}
      <Popover
        open={popoverOpen}
        onClose={handleClose}
        anchorEl={containerRef.current}
        transitionDuration={transitionDuration}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={popoverPaperProps(!!selectedResource, isSmallDevice, stardustTheme, muiTheme)}
        anchorReference= {isSmallDevice ? 'anchorPosition' : 'anchorEl'}
        anchorPosition= {{ left: 0, top: 0 }}
        marginThreshold={isSmallDevice ? 0 : 16}
        className='listbox-popover'
      >
        {(selectedResource || isSingle)
          ? <ListboxContainer layout={selectedResource?.layout ?? resources[0].layout} stores={stores} closePopover={closePopover} isPopover={true} />
          : <Grid container direction='column' spacing={1} padding='8px' className='folded-listbox-dropdown' onKeyDown={onFoldedListboxDropdownKeyDown}>
            {!!resources?.length && resources?.map((resource) => (
              <Grid item key={resource.id}>
                <FoldedListbox onClick={selectResource} resource={resource} stores={stores} isInPopover />
              </Grid>
            ))}
          </Grid>
        }
      </Popover>
    </StyledDiv>
  );
};
