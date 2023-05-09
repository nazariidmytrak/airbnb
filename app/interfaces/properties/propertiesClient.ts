import { SafeListing } from '../safe/safeListing';
import { SafeUser } from '../safe/safeUser';

export interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}
