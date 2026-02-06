// Filter options for the search interface
export const zones = [
  { value: '', label: 'All Zones' },
  { value: 'Sandy Hill', label: 'Sandy Hill' },
  { value: 'Downtown', label: 'Downtown/Byward Market' },
  { value: 'Lowertown', label: 'Lowertown' },
  { value: 'Vanier', label: 'Vanier' },
  { value: 'Centretown', label: 'Centretown' },
  { value: 'Glebe', label: 'Glebe' },
  { value: 'Old Ottawa East', label: 'Old Ottawa East' }
];

export const propertyTypes = [
  { value: '', label: 'All Types' },
  { value: 'Apartment', label: 'Apartment' },
  { value: 'Studio', label: 'Studio' },
  { value: 'Condo', label: 'Condo' },
  { value: 'Townhouse', label: 'Townhouse' },
  { value: 'Room in House', label: 'Room in House' },
  { value: 'Basement Suite', label: 'Basement Suite' }
];

export const rentalTypes = [
  { value: '', label: 'All Rental Types' },
  { value: 'rental', label: 'Long-term Rental' },
  { value: 'sublet', label: 'Sublet' }
];

export const bedroomOptions = [
  { value: '', label: 'Any Bedrooms' },
  { value: '0', label: 'Studio' },
  { value: '1', label: '1 Bedroom' },
  { value: '2', label: '2 Bedrooms' },
  { value: '3', label: '3+ Bedrooms' }
];

// Legacy export for backwards compatibility
export const residenceTypes = propertyTypes;
