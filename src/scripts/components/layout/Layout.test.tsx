import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { Layout } from 'components/layout/Layout';
import { withMockedProviders } from 'test/component';

describe('components/layout/Layout', () => {
  it('should render correctly', () => {
    const { container } = render(withMockedProviders(<Layout />));
    expect(container).toMatchSnapshot();
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  it('should render with children', () => {
    const tree = render(
      withMockedProviders(
        <Layout>
          <label>child</label>
        </Layout>,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('child')).toBeInTheDocument();
    expect(tree.container.querySelector('label')).toBeInTheDocument();
  });
});
