import { getStudentsWhoLiked, getListingsByPopularity } from '../data/students';
import { offCampusListings } from '../data/offCampusListings';
import type { Listing } from '../types';
import './RoommateFinder.css';

interface RoommateFinderProps {
  onSelectListing: (listingId: string) => void;
}

export function RoommateFinder({ onSelectListing }: RoommateFinderProps) {
  const popularListings = getListingsByPopularity();

  const getListingById = (id: string): Listing | undefined => 
    offCampusListings.find(l => l.id === id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="roommate-finder">
      <div className="finder-header">
        <div>
          <h2>Find Roommates</h2>
          <p>Click on a listing to find students interested in it</p>
        </div>
      </div>

      <div className="popular-listings">
        <h3>Trending Listings</h3>
        <p className="section-desc">Listings sorted by student interest - click to match with interested students</p>
        
        <div className="listings-grid">
        {popularListings.map(({ listingId, likeCount }) => {
            const listing = getListingById(listingId);
            if (!listing) return null;
            
            const interestedCount = getStudentsWhoLiked(listingId).length;
            
            return (
              <div 
                key={listingId} 
                className="popular-listing-card clickable"
                onClick={() => onSelectListing(listingId)}
              >
                <div className="listing-preview">
                  <img src={listing.images[0]} alt={listing.title} />
                  <div className="popularity-badge">
                    <span>❤️ {likeCount}</span>
                  </div>
                </div>
                <div className="listing-info">
                  <h4>{listing.title}</h4>
                  <p className="listing-address">{listing.address}</p>
                  <p className="listing-price">{formatPrice(listing.price)}/mo</p>
                  <p className="interested-count">{interestedCount} student{interestedCount !== 1 ? 's' : ''} interested</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


