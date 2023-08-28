import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { withMockedProviders } from 'test/component';
import { Layout } from 'components/layout/Layout';

describe('components/layout/Layout', () => {
  it('should render correctly', () => {
    const { container } = render(withMockedProviders(<Layout />));
    expect(container).toMatchSnapshot();
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
