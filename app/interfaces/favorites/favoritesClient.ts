import { SafeListing } from '../safe/safeListing';
import { SafeUser } from '../safe/safeUser';

export interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}
