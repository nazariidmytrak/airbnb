import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, MouseEvent } from 'react';
import { toast } from 'react-hot-toast';

import { SafeUser } from '../interfaces/safeUser';
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
        let request;
        hasFavorited
          ? (request = () => axios.delete(`/api/favorites/${listingId}`))
          : (request = () => axios.post(`api/favorites/${listingId}`));

        await request();
        router.refresh();
        toast.success('Success');
      } catch (error) {
        toast.error('Something went wrong');
      }
    },
    [router, currentUser, hasFavorited, listingId, loginModal]
  );
  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
