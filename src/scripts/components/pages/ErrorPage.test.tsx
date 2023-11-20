import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { withMockedProviders } from 'test/component';
import { ErrorPage } from 'components/pages/ErrorPage';

describe('components/pages/ErrorPage', () => {
  it('should render correctly', () => {
    const { container } = render(withMockedProviders(<ErrorPage />));
    expect(container).toMatchSnapshot();
  });
});
