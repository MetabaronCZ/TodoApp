import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { Toolbar } from 'components/common/Toolbar';
import { withMockedProviders } from 'test/component';

describe('components/common/Toolbar', () => {
  it('should render correctly', () => {
    const tree = render(
      withMockedProviders(<Toolbar items={[<div key={0}>CONTENT</div>]} />),
    );
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('CONTENT')).toBeInTheDocument();
  });

  it('should render children', () => {
    const testData: React.ReactNode[] = [
      <div key={0}>Item 1</div>,
      <div key={1}>Item 2</div>,
      'filler',
      <div key={2}>Item 3</div>,
      null,
    ];
    const { container } = render(
      withMockedProviders(<Toolbar items={testData} />),
    );
    expect(container).toMatchSnapshot();

    const items = Array.from(container.firstChild?.childNodes ?? []);
    expect(items.length).toEqual(4);

    expect(items.map((item) => item.textContent)).toEqual([
      'Item 1',
      'Item 2',
      '',
      'Item 3',
    ]);
  });
});
