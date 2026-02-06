import type { Listing } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import './ListingCard.css';

interface ListingCardProps {
  listing: Listing;
  onShowRoommates?: (listingId: string) => void;
}

export function ListingCard({ listing, onShowRoommates }: ListingCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(listing.id);
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getBedroomText = (bedrooms: number) => {
    if (bedrooms === 0) return 'Studio';
    if (bedrooms === 1) return '1 Bedroom';
    return `${bedrooms} Bedrooms`;
  };

  const getRentalTypeBadge = (rentalType: string) => {
    return rentalType === 'sublet' ? 'Sublet' : 'Lease Takeover';
  };

  return (
    <article className="listing-card">
      <div className="listing-image">
        <img src={listing.images[0]} alt={listing.title} loading="lazy" />
        <div className="listing-badges">
          <span className={`badge badge-rental ${listing.rentalType}`}>
            {getRentalTypeBadge(listing.rentalType)}
          </span>
          <span className={`badge badge-poster ${listing.postedBy}`}>
            {listing.postedBy === 'student' ? '🎓 Student' : '🏠 Landlord'}
          </span>
        </div>
        <button 
          className={`favorite-btn ${liked ? 'liked' : ''}`} 
          aria-label="Save listing"
          onClick={() => toggleFavorite(listing.id)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <div className="listing-content">
        <div className="listing-header">
          <div className="listing-price">{formatPrice(listing.price)}<span>/month</span></div>
          <div className="listing-zone">{listing.zone}</div>
        </div>

        <h3 className="listing-title">{listing.title}</h3>
        
        <div className="listing-location">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {listing.address}
        </div>

        <div className="listing-details">
          <span className="detail">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            {getBedroomText(listing.bedrooms)}
          </span>
          <span className="detail">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {listing.bathrooms} Bath
          </span>
          <span className="detail">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {formatDate(listing.availableFrom)}
          </span>
        </div>

        <p className="listing-description">{listing.description}</p>

        <div className="listing-amenities">
          {listing.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
          {listing.amenities.length > 3 && (
            <span className="amenity-more">+{listing.amenities.length - 3} more</span>
          )}
        </div>

        <div className="listing-footer">
          <span className="posted-date">Posted {formatDate(listing.postedDate)}</span>
          <div className="listing-actions">
            {onShowRoommates && (
              <button className="btn-roommates" onClick={() => onShowRoommates(listing.id)}>
                Find Roommates
              </button>
            )}
            <button className="btn-contact">Contact</button>
          </div>
        </div>
      </div>
    </article>
  );
}
