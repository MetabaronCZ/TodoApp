import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { Paragraph } from 'components/common/Paragraph';
import { withMockedProviders } from 'test/component';

describe('components/common/Paragraph', () => {
  it('should render correctly', () => {
    const tree = render(withMockedProviders(<Paragraph>CONTENT</Paragraph>));
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('CONTENT')).toBeInTheDocument();
  });
});
