import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import { withMockedProviders } from 'test/component';
import { ButtonRaw } from 'components/button/ButtonRaw';

describe('components/button/ButtonRaw', () => {
  it('should render correctly', () => {
    const { container } = render(withMockedProviders(<ButtonRaw />));
    expect(container).toMatchSnapshot();
  });

  it('should render props', () => {
    const { container } = render(
      withMockedProviders(
        <ButtonRaw id="test-id" className="test-class" title="Test button" />,
      ),
    );
    expect(container).toMatchSnapshot();
    expect(container.firstChild).toHaveClass('test-class');
    expect(container.firstChild).toHaveAttribute('id', 'test-id');
    expect(container.firstChild).toHaveAttribute('title', 'Test button');
  });

  it('should render disabled state', () => {
    const { container } = render(withMockedProviders(<ButtonRaw disabled />));
    expect(container).toMatchSnapshot();
    expect(container.firstChild).toBeDisabled();
  });

  it('should render children', () => {
    const { container } = render(
      withMockedProviders(
        <ButtonRaw>
          <span>Test button</span>
        </ButtonRaw>,
      ),
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelector('span')).toBeInTheDocument();
    expect(container.querySelector('span')?.textContent).toEqual('Test button');
  });

  it('should call onClick event', () => {
    const onClick = jest.fn();

    const tree = render(withMockedProviders(<ButtonRaw onClick={onClick} />));
    expect(onClick).not.toBeCalled();

    fireEvent.click(tree.getByRole('button'));
    expect(onClick).toBeCalledTimes(1);
    expect(onClick).lastCalledWith();
  });
});
