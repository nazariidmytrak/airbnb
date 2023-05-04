import { Reservation } from '@prisma/client';
import { SafeUser } from '../safe/safeUser';
import { SafeListing } from '../safe/safeListings';

export interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  currentUser?: SafeUser | null;
  onAction?: (id: string) => void;
}
