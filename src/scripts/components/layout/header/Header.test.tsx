import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { withMockedProviders } from 'test/component';
import { Header } from 'components/layout/header/Header';

describe('components/layout/Header', () => {
  it('should render correctly', () => {
    const { container } = render(withMockedProviders(<Header />));
    expect(container).toMatchSnapshot();
    expect(container.querySelector('[href="/settings"]')).toBeInTheDocument();
    expect(
      container.querySelector('[href="/folder/list"]'),
    ).toBeInTheDocument();
  });
});
