import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { withMockedProviders } from 'test/component';
import { Footer } from 'components/layout/footer/Footer';

describe('components/layout/Footer', () => {
  it('should render correctly', () => {
    const tree = render(withMockedProviders(<Footer />));
    expect(tree.container).toMatchSnapshot();
  });
});
