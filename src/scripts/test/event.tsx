import React, { FormEvent } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

export const mockClickEvent = (): Promise<React.MouseEvent> => {
  return new Promise((resolve) => {
    render(<div data-testid="test" onClick={resolve} />);
    fireEvent.click(screen.getByTestId('test'));
  });
};

export const mockChangeEvent = (
  value: string,
): Promise<React.ChangeEvent<HTMLInputElement>> => {
  return new Promise((resolve) => {
    render(<input data-testid="test" onChange={resolve} />);
    fireEvent.change(screen.getByTestId('test'), { target: { value } });
  });
};

export const mockCheckEvent = (
  checked = false,
): Promise<React.ChangeEvent<HTMLInputElement>> => {
  return new Promise((resolve) => {
    render(
      <input
        type="checkbox"
        checked={!checked}
        data-testid="test"
        onChange={resolve}
      />,
    );
    fireEvent.click(screen.getByTestId('test'));
  });
};

export const mockSubmitEvent = (): Promise<FormEvent> => {
  return new Promise((resolve) => {
    render(<form data-testid="test" onSubmit={resolve} />);
    fireEvent.submit(screen.getByTestId('test'));
  });
};
