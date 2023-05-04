import { SafeUser } from '../safe/safeUser';

export interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}
