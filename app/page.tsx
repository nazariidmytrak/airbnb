import Container from '@/app/shared/ui/container';
import EmptyState from '@/app/widgets/emptyState/ui';
import getListings, { IListingsParams } from './actions/getListings';
import ListingCard from './components/listings/listingCard';
import getCurrentUser from './actions/getCurrentUser';
export const dynamic = 'force-dynamic';

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className='listings'>
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Home;
