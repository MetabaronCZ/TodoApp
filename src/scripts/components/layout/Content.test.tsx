import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { withMockedProviders } from 'test/component';
import { Content } from 'components/layout/Content';

describe('components/layout/Content', () => {
  it('should render correctly', () => {
    const { container } = render(withMockedProviders(<Content />));
    expect(container).toMatchSnapshot();
  });

  it('should render with children', () => {
    const tree = render(
      withMockedProviders(
        <Content>
          <label>child</label>
        </Content>,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('child')).toBeInTheDocument();
    expect(tree.container.querySelector('label')).toBeInTheDocument();
  });
});
