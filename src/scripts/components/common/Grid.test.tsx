import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { Grid } from 'components/common/Grid';
import { withMockedProviders } from 'test/component';

describe('components/common/Grid', () => {
  it('should render correctly', () => {
    const tree = render(withMockedProviders(<Grid>CONTENT</Grid>));
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('CONTENT')).toBeInTheDocument();
  });

  it('should render props', () => {
    const tree = render(withMockedProviders(<Grid size={4} />));
    expect(tree.container).toMatchSnapshot();
    expect(tree.container.firstChild).toHaveStyle({ gap: '40px' });
  });

  it('should keep minimum prop size', () => {
    const tree = render(withMockedProviders(<Grid size={-2} />));
    expect(tree.container.firstChild).toHaveStyle({ gap: '0px' });
  });
});
