import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { withMockedProviders } from 'test/component';
import { Copyright } from 'components/layout/footer/Copyright';

describe('components/layout/Copyright', () => {
  it('should render correctly', () => {
    const tree = render(withMockedProviders(<Copyright />));
    expect(tree.container).toMatchSnapshot();

    const year = new Date().getFullYear();
    expect(tree.getByText(year, { exact: false })).toBeTruthy();
    expect(
      tree.container.querySelector('[href="https://github.com/MetabaronCZ"]'),
    ).toBeInTheDocument();
  });
});
