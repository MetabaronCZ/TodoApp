import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Button } from 'components/button/Button';
import { toVU } from 'modules/theme';

type DropdownAlign = 'left' | 'right';

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

interface StyledProps {
  readonly $align: DropdownAlign;
}

const List = styled.ul<StyledProps>`
  list-style-type: none;
  position: absolute;
  top: 100%;
  left: ${({ $align }) => ('left' === $align ? 0 : '')};
  right: ${({ $align }) => ('right' === $align ? 0 : '')};
  min-width: ${toVU(16)};
  border: ${({ theme }) => theme.border.light};
  background: ${({ theme }) => theme.color.background};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
`;

const ListItem = styled.li`
  /* */
`;

const StyledButton = styled(Button)`
  width: 100%;
  text-align: left;
  white-space: nowrap;
`;

export interface DropdownItem<T> {
  readonly id: string;
  readonly title: string;
  readonly value: T;
}

interface Props<T> {
  readonly id?: string;
  readonly items: DropdownItem<T>[];
  readonly value: T;
  readonly align?: DropdownAlign;
  readonly disabled?: boolean;
  readonly onSelect: (value: T) => void;
}

export const Dropdown = <T,>({
  id,
  items,
  value,
  align = 'left',
  disabled = false,
  onSelect,
}: Props<T>): React.ReactNode => {
  const [opened, setOpened] = useState(false);
  const containerElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!opened) {
      return;
    }
    const handler = (tgt?: Element | null): void => {
      const container = containerElement.current;

      if (container && tgt && !container.contains(tgt)) {
        setOpened(false);
      }
    };

    const clickHandler = (e: MouseEvent): void => {
      if (0 === e.button) {
        handler(e.target as Element);
      }
    };

    const focusHandler = (): void => {
      handler(document.activeElement);
    };

    const keyboardHandler = (e: KeyboardEvent): void => {
      if ('Escape' === e.code) {
        setOpened(false);
      }
    };

    document.addEventListener('mouseup', clickHandler);
    document.addEventListener('focusin', focusHandler);
    document.addEventListener('keydown', keyboardHandler);

    return () => {
      document.removeEventListener('mouseup', clickHandler);
      document.removeEventListener('focusin', focusHandler);
      document.removeEventListener('keydown', keyboardHandler);
    };
  }, [opened]);

  const selected = items.find((item) => value === item.value);

  if (!selected) {
    throw new Error('Could not render Dropdown component: Invalid value!!');
  }
  const select = (item: T): void => {
    onSelect(item);
    setOpened(false);
  };
  return (
    <Container ref={containerElement}>
      <Button
        id={id}
        icoAfter={opened ? '˄' : '˅'}
        text={selected.title}
        disabled={disabled}
        onClick={() => setOpened(!opened)}
      />
      {opened && (
        <List $align={align}>
          {items.map((item) => (
            <ListItem key={item.id}>
              <StyledButton
                text={item.title}
                onClick={() => select(item.value)}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};
