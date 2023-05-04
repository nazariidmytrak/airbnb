import { Reservation } from '@prisma/client';
import { SafeListing } from '../safe/safeListings';
import { SafeUser } from '../safe/safeUser';

export interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  reservations?: Reservation[];
  currentUser: SafeUser | null;
}
