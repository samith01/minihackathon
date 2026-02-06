export interface Listing {
  id: string;
  title: string;
  address: string;
  zone: string;
  propertyType: string;
  rentalType: string;
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
  contactPhone?: string;
}

export interface SearchFilters {
  zone: string;
  propertyType: string;
  rentalType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
}
