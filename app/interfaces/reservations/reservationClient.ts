import { SafeReservation } from '../safe/safeReservation';
import { SafeUser } from '../safe/safeUser';

export interface ReservationClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}
