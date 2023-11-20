import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { withMockedProviders } from 'test/component';
import { Logo } from 'components/layout/header/Logo';

describe('components/layout/Logo', () => {
  it('should render correctly', () => {
    const { container } = render(withMockedProviders(<Logo />));
    expect(container).toMatchSnapshot();
    expect(container.querySelector('[href="/"]')).toBeInTheDocument();
  });
});
