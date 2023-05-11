'use client';

import styles from './style.module.scss';
import Container from '@/app/shared/ui/container';
import CategoryBox from './categoryBox';
import { CATEGORIES } from '@/app/constants';
import { usePathname, useSearchParams } from 'next/navigation';

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className={styles.categories}>
        {CATEGORIES.map((item) => (
          <CategoryBox
            key={item.label}
            icon={item.icon}
            label={item.label}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
