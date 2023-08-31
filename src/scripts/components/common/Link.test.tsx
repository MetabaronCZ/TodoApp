import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { Link } from 'components/common/Link';
import { withMockedProviders } from 'test/component';

describe('components/common/Link', () => {
  it('should render correctly', () => {
    const tree = render(withMockedProviders(<Link href="/test">CONTENT</Link>));
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByRole('link')).toBeInTheDocument();
    expect(tree.getByText('CONTENT')).toBeInTheDocument();
  });

  it('should render props', () => {
    const { container } = render(
      withMockedProviders(<Link href="/test" target="_blank" />),
    );
    expect(container).toMatchSnapshot();
    expect(container.firstChild).toHaveAttribute('href', '/test');
    expect(container.firstChild).toHaveAttribute('target', '_blank');
  });
});
