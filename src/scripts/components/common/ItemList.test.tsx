import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { ItemList } from 'components/common/ItemList';
import { withMockedProviders } from 'test/component';

describe('components/common/ItemList', () => {
  it('should render correctly', () => {
    const { container } = render(
      withMockedProviders(<ItemList>CONTENT</ItemList>),
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector('ul')).toBeInTheDocument();

    const items = container.querySelectorAll('li');
    expect(items.length).toEqual(1);
    expect(items[0].textContent).toEqual('CONTENT');
  });

  it('should render nothing when no children', () => {
    const { container } = render(withMockedProviders(<ItemList />));
    expect(container).toMatchSnapshot();
    expect(container.innerHTML).toEqual('');
  });

  it('should render children', () => {
    const { container } = render(
      withMockedProviders(
        <ItemList>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </ItemList>,
      ),
    );
    expect(container).toMatchSnapshot();

    const items = Array.from(container.querySelectorAll('li'));
    expect(items.length).toEqual(3);
    expect(items.map((item) => item.textContent)).toEqual(['1', '2', '3']);
  });

  it('should render loading state', () => {
    const tree = render(
      withMockedProviders(<ItemList loading>CONTENT</ItemList>),
    );
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByRole('list')).toHaveStyle({ opacity: 0.5 });
  });
});
