import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, MouseEvent } from 'react';
import { toast } from 'react-hot-toast';

import { SafeUser } from '../interfaces/safe/safeUser';
import useLoginModal from './useLoginModal';

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        const endpoint = `/api/favorites/${listingId}`;
        const method = hasFavorited ? 'delete' : 'post';

        await axios[method](endpoint);
        toast.success(
          hasFavorited ? 'Deleted successfully' : 'Added successfully'
        );
        router.refresh();
      } catch (error) {
        toast.error('Something went wrong');
      }
    },
    [router, currentUser, hasFavorited, listingId, loginModal]
  );
  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
