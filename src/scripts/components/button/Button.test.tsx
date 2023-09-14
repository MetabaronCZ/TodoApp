import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import { Button } from 'components/button/Button';

import { icos } from 'modules/icos';
import { withMockedProviders } from 'test/component';

describe('components/button/Button', () => {
  it('should render <button> Button by default', () => {
    const onClick = jest.fn();
    const tree = render(withMockedProviders(<Button onClick={onClick} />));
    expect(tree.container).toMatchSnapshot();

    expect(onClick).not.toBeCalled();
    expect(tree.queryAllByRole('link').length).toEqual(0);
    expect(tree.queryAllByRole('button').length).toEqual(1);

    fireEvent.click(tree.getByRole('button'));
    expect(onClick).toBeCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toEqual(undefined);
  });

  it('should render link Button when href defined', () => {
    const tree = render(withMockedProviders(<Button href="/test" />));
    expect(tree.container).toMatchSnapshot();

    expect(tree.queryAllByRole('link').length).toEqual(1);
    expect(tree.queryAllByRole('button').length).toEqual(0);
    expect(tree.getByRole('link')).toHaveAttribute('href', '/test');
  });

  it('should prefer link Button when href and onClick defined', () => {
    const onClick = jest.fn();

    const tree = render(
      withMockedProviders(<Button href="/test" onClick={onClick} />),
    );
    expect(tree.container).toMatchSnapshot();

    expect(onClick).not.toBeCalled();
    expect(tree.queryAllByRole('link').length).toEqual(1);
    expect(tree.queryAllByRole('button').length).toEqual(0);
    expect(tree.getByRole('link')).toHaveAttribute('href', '/test');

    fireEvent.click(tree.getByRole('link'));
    expect(onClick).toBeCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toEqual(undefined);
  });

  it('should render props', () => {
    const { container } = render(
      withMockedProviders(
        <Button
          id="test-id"
          className="test-class"
          title="Test button"
          text="Button text"
        />,
      ),
    );
    expect(container).toMatchSnapshot();
    expect(container.firstChild).toHaveClass('test-class');
    expect(container.firstChild).toHaveAttribute('id', 'test-id');
    expect(container.firstChild).toHaveAttribute('title', 'Test button');
    expect(container.firstChild?.textContent).toEqual('Button text');
  });

  it('should render ico button', () => {
    const { container } = render(withMockedProviders(<Button ico="close" />));
    expect(container).toMatchSnapshot();
    expect(container.querySelectorAll('i').length).toEqual(1);
    expect(container.textContent).toEqual(icos.close);
  });

  it('should render ico before', () => {
    const { container } = render(
      withMockedProviders(<Button ico="close" text="Button" />),
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelectorAll('i').length).toEqual(1);
    expect(container.textContent).toEqual(`${icos.close}Button`);
  });

  it('should render ico after', () => {
    const { container } = render(
      withMockedProviders(<Button icoAfter="close" text="Button" />),
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelectorAll('i').length).toEqual(1);
    expect(container.textContent).toEqual(`Button${icos.close}`);
  });

  it('should render both icos', () => {
    const { container } = render(
      withMockedProviders(
        <Button icoBefore="arrowLeft" icoAfter="arrowRight" text="Button" />,
      ),
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelectorAll('i').length).toEqual(2);
    expect(container.textContent).toEqual(
      `${icos.arrowLeft}Button${icos.arrowRight}`,
    );
  });

  it('should render disabled state when onClick defined', () => {
    const onClick = jest.fn();

    const tree = render(
      withMockedProviders(<Button onClick={onClick} disabled />),
    );
    expect(onClick).not.toBeCalled();

    expect(tree.container).toMatchSnapshot();
    expect(tree.container.firstChild).toBeDisabled();

    const button = tree.getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).not.toBeCalled();
  });

  it('should render disabled state when href defined', () => {
    const onClick = jest.fn();

    const tree = render(
      withMockedProviders(<Button href="/test" onClick={onClick} disabled />),
    );
    expect(onClick).not.toBeCalled();

    expect(tree.container).toMatchSnapshot();
    expect(tree.container.firstChild).toBeDisabled();

    const button = tree.getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).not.toBeCalled();
  });
});
