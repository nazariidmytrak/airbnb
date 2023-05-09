import { SafeListing } from '../safe/safeListing';
import { SafeReservation } from '../safe/safeReservation';
import { SafeUser } from '../safe/safeUser';

export interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser | null;
  };
  reservations?: SafeReservation[];
  currentUser: SafeUser | null;
}
