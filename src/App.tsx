import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchFilters } from './components/SearchFilters';
import { ListingCard } from './components/ListingCard';
import { ChatInterface } from './components/ChatInterface';
import { RoommateFinder } from './components/RoommateFinder';
import { TinderSwipe } from './components/TinderSwipe';
import { Footer } from './components/Footer';
import { offCampusListings } from './data/offCampusListings';
import type { SearchFilters as SearchFiltersType } from './types';
import './App.css';

type Tab = 'browse' | 'chat' | 'roommates';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('browse');
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFiltersType>({
    zone: '',
    propertyType: '',
    rentalType: '',
    minPrice: 0,
    maxPrice: 9999,
    bedrooms: ''
  });
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'date'>('date');

  const filteredListings = useMemo(() => {
    let results = offCampusListings.filter((listing) => {
      if (filters.zone && listing.zone !== filters.zone) return false;
      if (filters.propertyType && listing.propertyType !== filters.propertyType) return false;
      if (filters.rentalType && listing.rentalType !== filters.rentalType) return false;
      if (listing.price < filters.minPrice || listing.price > filters.maxPrice) return false;
      if (filters.bedrooms) {
        const bedroomCount = parseInt(filters.bedrooms);
        if (filters.bedrooms === '3') {
          if (listing.bedrooms < 3) return false;
        } else if (listing.bedrooms !== bedroomCount) {
          return false;
        }
      }
      return true;
    });

    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'date':
        results.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
    }

    return results;
  }, [filters, sortBy]);

  const handlePostAdClick = () => {
    alert('Sign in to post an ad!');
  };

  return (
    <div className="app">
      <Header onPostAdClick={handlePostAdClick} />
      
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <div className="tab-container">
          <button 
            className={`tab-btn ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Browse Listings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            AI Assistant
          </button>
          <button 
            className={`tab-btn ${activeTab === 'roommates' ? 'active' : ''}`}
            onClick={() => { setActiveTab('roommates'); setSelectedListingId(null); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Find Roommates
          </button>
        </div>
      </div>

      <main>
        {activeTab === 'browse' ? (
          <>
            <SearchFilters 
              filters={filters} 
              onFilterChange={setFilters}
              resultsCount={filteredListings.length}
            />

            <section className="listings-section">
              <div className="listings-container">
                <div className="listings-header">
                  <h2>Off-Campus Housing ({filteredListings.length})</h2>
                  <div className="sort-controls">
                    <label htmlFor="sort">Sort by:</label>
                    <select 
                      id="sort" 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    >
                      <option value="date">Newest First</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {filteredListings.length > 0 ? (
                  <>
                    <div className="listings-grid">
                      {filteredListings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                      ))}
                    </div>
                    <div className="listings-actions">
                      <button className="btn-show-more">Show More</button>
                      <button className="btn-find-roommate" onClick={() => setActiveTab('roommates')}>
                        Find me a roommate!
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="no-results">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                    <h3>No listings found</h3>
                    <p>Try adjusting your filters to see more results</p>
                  </div>
                )}
              </div>
            </section>
          </>
        ) : activeTab === 'roommates' ? (
          <div className="roommates-main">
            {selectedListingId ? (
              <TinderSwipe onBack={() => setSelectedListingId(null)} listingId={selectedListingId} />
            ) : (
              <RoommateFinder onSelectListing={(id) => setSelectedListingId(id)} />
            )}
          </div>
        ) : (
          <div className="chat-main">
            <ChatInterface />
          </div>
        )}
      </main>

      {activeTab === 'browse' && <Footer />}
    </div>
  );
}

export default App;
