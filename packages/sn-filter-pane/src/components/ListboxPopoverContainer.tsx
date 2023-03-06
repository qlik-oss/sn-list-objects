import { Grid, PaperProps, Popover } from '@mui/material';
import { stardust } from '@nebula.js/stardust';
import React, { useState, useRef } from 'react';
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

const popoverPaperProps = (selectedResource: boolean, stardustTheme?: stardust.Theme): PaperProps => (
  {
    style: {
      height: selectedResource ? '330px' : undefined,
      resize: selectedResource ? 'both' : undefined,
      width: '160px',
      overflow: 'hidden',
      backgroundColor: stardustTheme?.getStyle('object', '', 'filterpane.backgroundColor'),
    },
  }
);

/**
 * If a single resource is passed to this component a FoldedListbox is rendered.
 * When the FoldedListbox is clicked, a Listbox is rendered in a Popover.
 * If 2 or more resources are passed, an ExpandButton is rendered with a number that
 * tells the user how many Listboxes are hidden. If the ExpandButton is clicked a list of
 * FoldedLisbox:es are rendered which in themselves are clickable.
 */
export const ListboxPopoverContainer = ({ resources, stores }: FoldedPopoverProps) => {
  const { constraints, stardustTheme } = stores.store.getState();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const containerRef = useRef(null);
  const [selectedResource, setSelectedResource] = useState<IListboxResource | undefined>();
  const transitionDuration = 200;

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
        PaperProps={popoverPaperProps(!!selectedResource, stardustTheme)}
      >
        {(selectedResource || isSingle)
          ? <ListboxContainer layout={selectedResource?.layout ?? resources[0].layout} stores={stores} />
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
