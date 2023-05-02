'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { EmptyStateProps } from '@/app/interfaces/main/emptyState';
import Heading from '../../modals/modal/heading';
import Button from '../../button';

const EmptyState: FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters',
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className={styles['empty-state']}>
      <Heading title={title} subtitle={subtitle} center />
      <div className={styles['empty-state__button']}>
        {showReset && (
          <Button
            onClick={() => router.push('/')}
            outline
            label='Remove all filters'
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
