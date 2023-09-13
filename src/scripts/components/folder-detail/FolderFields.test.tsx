import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import * as ItemList from 'components/common/ItemList';
import { FolderFields } from 'components/folder-detail/FolderFields';

import { FolderData } from 'models/Folder';
import { withMockedProviders } from 'test/component';

const testData: FolderData = {
  title: 'Edited folder',
};

describe('components/folder-detail/FolderFields', () => {
  it('should render correctly', () => {
    const { container } = render(
      withMockedProviders(
        <FolderFields fields={testData} onChange={() => null} />,
      ),
    );
    expect(container).toMatchSnapshot();
  });

  it('should render props', () => {
    const itemList = jest.spyOn(ItemList, 'ItemList');
    expect(itemList).toHaveBeenCalledTimes(0);

    const tree = render(
      withMockedProviders(
        <FolderFields
          fields={testData}
          errors={{ title: 'Title field error' }}
          loading
          onChange={() => null}
        />,
      ),
    );
    expect(tree.container).toMatchSnapshot();

    expect(itemList).toHaveBeenCalledTimes(1);
    expect(itemList.mock.calls[0][0].loading).toEqual(true);

    const input = tree.container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input?.value).toEqual('Edited folder');

    expect(tree.getByText('Title field error')).toBeInTheDocument();
  });

  it('should call onChange', () => {
    const onChange = jest.fn();

    const tree = render(
      withMockedProviders(
        <FolderFields fields={testData} onChange={onChange} />,
      ),
    );
    expect(onChange).toHaveBeenCalledTimes(0);

    const input = tree.container.querySelector('input');
    expect(input).toBeInTheDocument();

    // trigger onChange event
    if (input) {
      fireEvent.change(input, { target: { value: 'New title' } });
    }
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('title', 'New title');
  });
});
