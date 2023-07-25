import React, { PropsWithChildren, useEffect, useState } from 'react';

import { Loader } from 'components/common/Loader';

import { useAppDispatch } from 'store/utils';
import { fetchTodos } from 'store/todos/actions';
import { fetchFolders } from 'store/folders/actions';
import { fetchSettings } from 'store/settings/actions';

export const Initialization: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      dispatch(fetchSettings()),
      dispatch(fetchTodos()),
      dispatch(fetchFolders()),
    ]).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  return loading ? <Loader /> : children;
};
