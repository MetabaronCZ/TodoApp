import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Heading } from 'components/common/Heading';
import { withMockedProviders } from 'test/component';

describe('components/common/Heading', () => {
  it('should render correctly', () => {
    const tree = render(withMockedProviders(<Heading>CONTENT</Heading>));
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByRole('heading')).toBeInTheDocument();
    expect(tree.getByText('CONTENT')).toBeInTheDocument();
  });

  it('should render props', () => {
    const tree = render(withMockedProviders(<Heading tag="h3" />));
    expect(tree.container).toMatchSnapshot();
    expect(tree.container.querySelector('h3')).toBeInTheDocument();
  });
});
