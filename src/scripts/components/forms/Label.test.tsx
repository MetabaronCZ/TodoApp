import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { Label } from 'components/forms/Label';

import { theme } from 'modules/theme';
import { hexToRgb } from 'modules/colors';
import { withMockedProviders } from 'test/component';

describe('components/forms/Label', () => {
  it('should render correctly', () => {
    const { container } = render(withMockedProviders(<Label text="Label" />));
    expect(container).toMatchSnapshot();
  });

  it('should render props', () => {
    const { container } = render(
      withMockedProviders(<Label text="Label" htmlFor="ID" disabled />),
    );
    expect(container).toMatchSnapshot();

    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'ID');
    expect(label).toHaveStyle({ color: hexToRgb(theme.color.disabled) });
  });
});
