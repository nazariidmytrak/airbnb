import EmptyState from '../components/main/emptyState';
import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';
import PropertiesClient from '../components/properties/propertiesClient';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title='Unauthorized' subtitle='Please login!' />;
  }
  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title='No properties found'
        subtitle='Look like you have no properties'
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
