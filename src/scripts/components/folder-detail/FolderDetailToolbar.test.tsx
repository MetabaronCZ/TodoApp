import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FolderDetailToolbar } from 'components/folder-detail/FolderDetailToolbar';
import { withMockedProviders } from 'test/component';

describe('components/folder-detail/FolderDetailToolbar', () => {
  it('should render correctly', () => {
    const { container } = render(withMockedProviders(<FolderDetailToolbar />));
    expect(container).toMatchSnapshot();
  });

  it('should be disabled', () => {
    const { container } = render(
      withMockedProviders(<FolderDetailToolbar disabled />),
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector('button:disabled')).toBeInTheDocument();
  });
});
