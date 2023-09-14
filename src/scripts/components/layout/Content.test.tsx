import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { withMockedProviders } from 'test/component';
import { Content } from 'components/layout/Content';

describe('components/layout/Content', () => {
  it('should render correctly', () => {
    const tree = render(
      withMockedProviders(
        <Content>
          <div>CONTENT</div>
        </Content>,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('CONTENT')).toBeInTheDocument();
  });
});
