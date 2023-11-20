import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FolderListItem } from 'components/folder-list/FolderListItem';

import { Folder } from 'models/Folder';
import { withMockedProviders } from 'test/component';

const testData: Folder = { id: '0', title: 'Test folder' };

describe('components/folder-list/FolderListItem', () => {
  it('should render correctly', () => {
    const tree = render(
      withMockedProviders(
        <FolderListItem
          item={testData}
          onSelect={() => null}
          onDelete={() => null}
        />,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('Test folder')).toBeInTheDocument();
    expect(tree.getByRole('checkbox')).toBeInTheDocument();
    expect(tree.getByRole('checkbox')).not.toHaveAttribute('checked');
  });

  it('should be selectable', () => {
    const onSelect = vi.fn();

    const tree = render(
      withMockedProviders(
        <FolderListItem
          item={testData}
          selected
          onSelect={onSelect}
          onDelete={() => null}
        />,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(onSelect).toBeCalledTimes(0);

    const checkbox = tree.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('checked');

    fireEvent.click(checkbox);
    expect(onSelect).toBeCalledTimes(1);
    expect(onSelect).toBeCalledWith(false);
  });

  it('should be delete-able', () => {
    const onDelete = vi.fn();

    const tree = render(
      withMockedProviders(
        <FolderListItem
          item={testData}
          onSelect={() => null}
          onDelete={onDelete}
        />,
      ),
    );
    expect(onDelete).toBeCalledTimes(0);

    const button = tree.getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onDelete).toBeCalledTimes(1);
  });
});
