import { SafeUser } from '../safe/safeUser';
import { SafeListing } from '../safe/safeListing';
import { SafeReservation } from '../safe/safeReservation';

export interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  currentUser?: SafeUser | null;
  onAction?: (id: string) => void;
}
