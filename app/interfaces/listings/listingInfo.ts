import { IconType } from 'react-icons';
import { SafeUser } from '../safe/safeUser';

export interface ListingInfoProps {
  user: SafeUser | null;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}
