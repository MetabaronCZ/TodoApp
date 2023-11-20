import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Loader } from 'components/common/Loader';
import { withMockedProviders } from 'test/component';

describe('components/common/Loader', () => {
  it('should render correctly', () => {
    const tree = render(withMockedProviders(<Loader />));
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('↻')).toBeInTheDocument();
  });
});
