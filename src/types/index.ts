export interface Listing {
  id: string;
  title: string;
  location: string;
  zone: string;
  residenceType: 'apartment' | 'conventional' | 'university';
  buildingName: string;
  rentalType: 'sublet' | 'takeover';
  price: number;
  bedrooms: number;
  bathrooms: number;
  availableFrom: string;
  description: string;
  amenities: string[];
  images: string[];
  postedBy: 'student' | 'landlord';
  postedDate: string;
  contactEmail: string;
}

export interface SearchFilters {
  zone: string;
  residenceType: string;
  rentalType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
}
