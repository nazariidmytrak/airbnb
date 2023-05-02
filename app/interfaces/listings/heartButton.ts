import { SafeUser } from '../safeUser';

export interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}
