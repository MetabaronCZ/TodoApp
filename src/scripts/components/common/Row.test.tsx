import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Row } from 'components/common/Row';
import { withMockedProviders } from 'test/component';

describe('components/common/Row', () => {
  it('should render correctly', () => {
    const tree = render(withMockedProviders(<Row>CONTENT</Row>));
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('CONTENT')).toBeInTheDocument();
  });

  it('should render props', () => {
    const tree = render(withMockedProviders(<Row size={4} />));
    expect(tree.container).toMatchSnapshot();
    expect(tree.container.firstChild).toHaveStyle({ gap: '40px' });
  });

  it('should keep minimum prop size', () => {
    const tree = render(withMockedProviders(<Row size={-2} />));
    expect(tree.container.firstChild).toHaveStyle({ gap: '0px' });
  });
});
