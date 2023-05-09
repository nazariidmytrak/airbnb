import EmptyState from '../components/main/emptyState';

import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoritesClient from '../components/favorites/favoritesClient';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <EmptyState
        title='No favorites found!'
        subtitle='Look like you have no favorite listings'
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;
