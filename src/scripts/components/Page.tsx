import React, { PropsWithChildren, useEffect } from 'react';
import { Layout } from './layout/Layout';

interface Props extends PropsWithChildren {
  readonly title: string;
}

export const Page: React.FC<Props> = ({ title, children }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <Layout>{children}</Layout>;
};
