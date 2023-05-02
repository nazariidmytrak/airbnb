import { Listing, Reservation } from '@prisma/client';
import { SafeUser } from '../safeUser';

export interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  currentUser?: SafeUser | null;
  onAction?: (id: string) => void;
}
