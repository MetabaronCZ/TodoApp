import React from 'react';

import { render } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { TodoDetailToolbar } from 'components/todo-detail/TodoDetailToolbar';
import { withMockedProviders } from 'test/component';

describe('components/todo-detail/TodoDetailToolbar', () => {
  it('should render correctly', () => {
    const { container } = render(withMockedProviders(<TodoDetailToolbar />));
    expect(container).toMatchSnapshot();
  });

  it('should be disabled', () => {
    const { container } = render(
      withMockedProviders(<TodoDetailToolbar disabled />),
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector('button:disabled')).toBeInTheDocument();
  });
});
