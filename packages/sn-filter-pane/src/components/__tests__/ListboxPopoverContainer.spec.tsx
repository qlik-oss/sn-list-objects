import React from 'react';
import {
  fireEvent, queryByAttribute, render,
} from '@testing-library/react';
import { IListboxResource } from '../../hooks/types';
import { ListboxPopoverContainer } from '../ListboxPopoverContainer';
import { create } from '../../store';

jest.mock('../../services/render-tracker', () => ({
  __esModule: true,
  default: () => ({}),
}));

const getResource = (id: string) => ({
  id,
  layout: {
    title: 'Foo',
    qListObject: {
      qDimensionInfo: {
        qStateCounts: {
          qSelected: 10,
          qLocked: 10,
          qOption: 10,
          qAlternative: 10,
        },
        qCardinal: 40,
      },
    },
  },
});
const resources: IListboxResource[] = [...Array(4)].map((_, i) => ({ ...getResource(String(i)) as unknown as IListboxResource }));

describe('ListboxPopoverContainer render', () => {
  it('should render FoldedListbox with fieldname when one resource is provided', () => {
    const { queryByText } = render(
      <ListboxPopoverContainer resources={[getResource('123') as unknown as IListboxResource]} stores={create()} />,
    );
    expect(queryByText('Foo')).toBeTruthy();
  });

  it('should render 4 "Foo" items when clicked', () => {
    const { getAllByText, container } = render(
      <ListboxPopoverContainer resources={resources as IListboxResource[]} stores={create()} />,
    );
    const button = queryByAttribute('data-testid', container, 'filterpane-expand-button');
    fireEvent.click(button as Element);
    const items = getAllByText('Foo');
    expect(items.length).toBe(4);
  });
});
