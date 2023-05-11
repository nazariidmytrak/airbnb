import EmptyState from '@/app/widgets/emptyState/ui';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getListings from '@/app/actions/getListings';
import PropertiesClient from '@/app/components/properties/propertiesClient';

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
