import type { SearchFilters as SearchFiltersType } from '../types';
import { zones, residenceTypes, rentalTypes, bedroomOptions } from '../data/mockData';
import './SearchFilters.css';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFilterChange: (filters: SearchFiltersType) => void;
  resultsCount: number;
}

export function SearchFilters({ filters, onFilterChange, resultsCount }: SearchFiltersProps) {
  const handleChange = (field: keyof SearchFiltersType, value: string | number) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleReset = () => {
    onFilterChange({
      zone: '',
      residenceType: '',
      rentalType: '',
      minPrice: 0,
      maxPrice: 9999,
      bedrooms: ''
    });
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-header">
          <h2>Find Your Perfect Home</h2>
          <p>Search through available listings near uOttawa campus</p>
        </div>

        <div className="search-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="zone">Location Zone</label>
              <select
                id="zone"
                value={filters.zone}
                onChange={(e) => handleChange('zone', e.target.value)}
              >
                {zones.map((zone) => (
                  <option key={zone.value} value={zone.value}>
                    {zone.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="residenceType">Residence Type</label>
              <select
                id="residenceType"
                value={filters.residenceType}
                onChange={(e) => handleChange('residenceType', e.target.value)}
              >
                {residenceTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="rentalType">Rental Type</label>
              <select
                id="rentalType"
                value={filters.rentalType}
                onChange={(e) => handleChange('rentalType', e.target.value)}
              >
                {rentalTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="bedrooms">Bedrooms</label>
              <select
                id="bedrooms"
                value={filters.bedrooms}
                onChange={(e) => handleChange('bedrooms', e.target.value)}
              >
                {bedroomOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-row price-row">
            <div className="price-range">
              <div className="filter-group">
                <label htmlFor="minPrice">Min Price</label>
                <div className="price-input">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    id="minPrice"
                    value={filters.minPrice}
                    onChange={(e) => handleChange('minPrice', parseInt(e.target.value) || 0)}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>
              <span className="price-separator">to</span>
              <div className="filter-group">
                <label htmlFor="maxPrice">Max Price</label>
                <div className="price-input">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    id="maxPrice"
                    value={filters.maxPrice}
                    onChange={(e) => handleChange('maxPrice', parseInt(e.target.value) || 9999)}
                    min="0"
                    placeholder="9999"
                  />
                </div>
              </div>
            </div>

            <div className="filter-actions">
              <button className="btn btn-reset" onClick={handleReset}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="search-results-info">
          <span className="results-count">
            <strong>{resultsCount}</strong> listing{resultsCount !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>
    </section>
  );
}
