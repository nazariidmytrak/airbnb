import { SafeReservation } from '../safe/safeReservation';
import { SafeUser } from '../safe/safeUser';

export interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}
