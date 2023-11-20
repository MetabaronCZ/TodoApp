import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Page } from 'components/Page';
import { withMockedProviders } from 'test/component';

describe('components/Page', () => {
  it('should render correctly', () => {
    expect(document.title).toEqual('');

    const tree = render(
      withMockedProviders(
        <Page title="Test page">
          <div>CONTENT</div>
        </Page>,
      ),
    );
    expect(tree.container).toMatchSnapshot();
    expect(tree.getByText('CONTENT')).toBeInTheDocument();
    expect(document.title).toEqual('Test page');
  });
});
