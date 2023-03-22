import {
  Grid, PaperProps, Popover, Theme,
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

  const closePopover = (close : boolean) => {
    if (close) {
      handleClose();
    }
  };

  const isSingle = resources.length === 1;

  const selectResource = ({ resource }: FoldedListboxClickEvent) => {
    setSelectedResource(resource);
  };

  if (resources.length === 1 && !selectedResource) {
    setSelectedResource(resources[0]);
  }

  return (
    <div ref={containerRef}>
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
        marginThreshold= {isSmallDevice ? 0 : 16}
      >
        {(selectedResource || isSingle)
          ? <ListboxContainer layout={selectedResource?.layout ?? resources[0].layout} stores={stores} closePopover={ closePopover } />
          : <Grid container direction='column' spacing={1} padding='8px'>
            {!!resources?.length && resources?.map((resource) => (
              <Grid item key={resource.id}>
                <FoldedListbox onClick={selectResource} resource={resource} stores={stores} />
              </Grid>
            ))}
          </Grid>
        }
      </Popover>
    </div>
  );
};
