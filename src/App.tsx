import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchFilters } from './components/SearchFilters';
import { ListingCard } from './components/ListingCard';
import { Footer } from './components/Footer';
import { mockListings } from './data/mockData';
import type { SearchFilters as SearchFiltersType } from './types';
import './App.css';

function App() {
  const [filters, setFilters] = useState<SearchFiltersType>({
    zone: '',
    residenceType: '',
    rentalType: '',
    minPrice: 0,
    maxPrice: 9999,
    bedrooms: ''
  });

  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'date'>('date');

  const filteredListings = useMemo(() => {
    let results = mockListings.filter((listing) => {
      // Zone filter
      if (filters.zone && listing.zone !== filters.zone) return false;
      
      // Residence type filter
      if (filters.residenceType && listing.residenceType !== filters.residenceType) return false;
      
      // Rental type filter
      if (filters.rentalType && listing.rentalType !== filters.rentalType) return false;
      
      // Price range filter
      if (listing.price < filters.minPrice || listing.price > filters.maxPrice) return false;
      
      // Bedrooms filter
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

    // Sort results
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
    alert('Sign in to post an ad! (Frontend demo only)');
  };

  return (
    <div className="app">
      <Header onPostAdClick={handlePostAdClick} />
      
      <main>
        <SearchFilters 
          filters={filters} 
          onFilterChange={setFilters}
          resultsCount={filteredListings.length}
        />

        <section className="listings-section">
          <div className="listings-container">
            <div className="listings-header">
              <h2>Available Listings</h2>
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
              <div className="listings-grid">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
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

        <section className="info-section">
          <div className="info-container">
            <div className="info-card">
              <div className="info-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3>Know the Zones</h3>
              <p>Ottawa is divided into zones based on proximity to campus. Zone A is on or near campus, while other zones offer different commute times and housing styles.</p>
              <a href="#zones" className="info-link">Learn about zones →</a>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Stay Safe</h3>
              <p>Always verify listings before signing agreements. Meet landlords in person, never send money without seeing the property, and read all contracts carefully.</p>
              <a href="#safety" className="info-link">Safety tips →</a>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h3>Tenant Rights</h3>
              <p>As a tenant in Ontario, you have rights protected by the Residential Tenancies Act. Understand what landlords can and cannot do.</p>
              <a href="#rights" className="info-link">Your rights →</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
