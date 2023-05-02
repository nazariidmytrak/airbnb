import Container from './components/container';
import EmptyState from './components/main/emptyState';
import getListings from './actions/getListings';
import ListingCard from './components/listings/listingCard';
import getCurrentUser from './actions/getCurrentUser';

export default async function Home() {
  const listings = await getListings();
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
}
