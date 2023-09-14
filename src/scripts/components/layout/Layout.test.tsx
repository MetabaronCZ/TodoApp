import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { Layout } from 'components/layout/Layout';
import { withMockedProviders } from 'test/component';

describe('components/layout/Layout', () => {
  it('should render correctly', () => {
    const tree = render(
      withMockedProviders(
        <Layout>
          <div>CONTENT</div>
        </Layout>,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(tree.container.querySelector('header')).toBeInTheDocument();
    expect(tree.container.querySelector('footer')).toBeInTheDocument();
    expect(tree.container.querySelector('main')).toBeInTheDocument();
    expect(tree.getByText('CONTENT')).toBeInTheDocument();
  });
});
