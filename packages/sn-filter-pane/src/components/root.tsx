import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { IContainerElement } from '../hooks/types';
import ListboxGrid from './ListboxGrid/ListboxGrid';
import theme from '../theme/theme';
import type { IStores } from '../store';

export function render(element: IContainerElement, stores: IStores) {
  console.log('render', element);
  const root = createRoot(element);
  root.render(
    <ThemeProvider theme={theme}>
      <ListboxGrid stores={stores} />
    </ThemeProvider>,
  );

  return root;
}

export function teardown(root: Root) {
  root.unmount();
}
