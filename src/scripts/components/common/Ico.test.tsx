import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { Ico } from 'components/common/Ico';

import { icos } from 'modules/icos';
import { theme } from 'modules/theme';
import { hexToRgb } from 'modules/colors';
import { withMockedProviders } from 'test/component';

describe('components/common/Ico', () => {
  it('should render correctly', () => {
    const tree = render(withMockedProviders(<Ico ico="close" />));
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText(icos.close)).toBeInTheDocument();
    expect(tree.container.querySelector('i')).toBeInTheDocument();
  });

  it('should render with props', () => {
    const { container } = render(
      withMockedProviders(<Ico ico="close" color="error" />),
    );
    expect(container).toMatchSnapshot();

    expect(container.firstChild).toHaveStyle({
      color: hexToRgb(theme.color.error),
    });
  });
});
