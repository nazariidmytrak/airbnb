'use client';

import { useEffect, FC } from 'react';
import EmptyState from '@/app/widgets/emptyState/ui';

interface ErrorStateProps {
  error: Error;
}

const ErrorState: FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title='Oops!' subtitle='Something went wrong!' />;
};

export default ErrorState;
