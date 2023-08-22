import { ChangeEvent, FormEvent, MouseEvent } from 'react';

export type OnClick = () => void;
export type OnSubmit = () => void;
export type OnChange<T> = (value: T) => void;

type Changable = HTMLInputElement | HTMLTextAreaElement;

export const click = (cb?: OnClick) => (e: MouseEvent) => {
  if (cb) {
    e.preventDefault();
    cb();
  }
};

export const change =
  (cb?: OnChange<string>) => (e: ChangeEvent<Changable>) => {
    if (cb) {
      cb(e.target.value);
    }
  };

export const check =
  (cb?: OnChange<boolean>) => (e: ChangeEvent<HTMLInputElement>) => {
    if (cb) {
      cb(e.target.checked);
    }
  };

export const submit = (cb?: OnSubmit) => (e: FormEvent) => {
  if (cb) {
    e.preventDefault();
    cb();
  }
};
