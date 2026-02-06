import type { Listing } from '../types';

export const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Cozy 1-Bedroom in Henderson',
    location: 'Henderson Residence',
    zone: 'Zone A - Campus',
    residenceType: 'university',
    buildingName: 'Henderson',
    rentalType: 'sublet',
    price: 850,
    bedrooms: 1,
    bathrooms: 1,
    availableFrom: '2026-05-01',
    description: 'Bright and spacious room available for summer sublet. Close to all campus amenities, gym, and dining hall. Perfect for summer students!',
    amenities: ['WiFi Included', 'Furnished', 'Laundry on Floor', 'Study Room Access'],
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600'],
    postedBy: 'student',
    postedDate: '2026-02-01',
    contactEmail: 'student1@uottawa.ca'
  },
  {
    id: '2',
    title: 'Spacious Room at 90 University',
    location: '90 University Private',
    zone: 'Zone A - Campus',
    residenceType: 'university',
    buildingName: '90 University',
    rentalType: 'takeover',
    price: 950,
    bedrooms: 1,
    bathrooms: 1,
    availableFrom: '2026-05-15',
    description: 'Modern room in the heart of campus. Walking distance to STEM, Morisset Library, and UCU. All utilities included.',
    amenities: ['All Utilities Included', 'Furnished', 'Gym Access', '24/7 Security'],
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600'],
    postedBy: 'student',
    postedDate: '2026-01-28',
    contactEmail: 'student2@uottawa.ca'
  },
  {
    id: '3',
    title: 'Hyman-Soloway Apartment Style',
    location: 'Hyman-Soloway Residence',
    zone: 'Zone A - Campus',
    residenceType: 'apartment',
    buildingName: 'Hyman Soloway',
    rentalType: 'sublet',
    price: 780,
    bedrooms: 1,
    bathrooms: 1,
    availableFrom: '2026-06-01',
    description: 'Private bedroom in a 4-bedroom apartment. Shared kitchen and living space. Great for meeting new friends!',
    amenities: ['Shared Kitchen', 'WiFi Included', 'Furnished', 'Common Room'],
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600'],
    postedBy: 'student',
    postedDate: '2026-02-03',
    contactEmail: 'student3@uottawa.ca'
  },
  {
    id: '4',
    title: 'Marchand Single Room',
    location: 'Marchand Residence',
    zone: 'Zone A - Campus',
    residenceType: 'conventional',
    buildingName: 'Marchand',
    rentalType: 'sublet',
    price: 720,
    bedrooms: 1,
    bathrooms: 1,
    availableFrom: '2026-05-01',
    description: 'Traditional residence room in Marchand. Quiet floor, great for studying. Meal plan can be transferred.',
    amenities: ['Meal Plan Available', 'Furnished', 'Quiet Floor', 'Study Lounges'],
    images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600'],
    postedBy: 'student',
    postedDate: '2026-02-04',
    contactEmail: 'student4@uottawa.ca'
  },
  {
    id: '5',
    title: 'Sandy Hill 2-Bedroom Apartment',
    location: 'Sandy Hill',
    zone: 'Zone B - Sandy Hill',
    residenceType: 'apartment',
    buildingName: 'Private Building',
    rentalType: 'takeover',
    price: 1400,
    bedrooms: 2,
    bathrooms: 1,
    availableFrom: '2026-07-01',
    description: 'Beautiful 2-bedroom apartment in Sandy Hill, 10 min walk to campus. Recently renovated with modern finishes.',
    amenities: ['In-Unit Laundry', 'Balcony', 'Parking Available', 'Pet Friendly'],
    images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600'],
    postedBy: 'landlord',
    postedDate: '2026-01-25',
    contactEmail: 'landlord1@email.com'
  },
  {
    id: '6',
    title: 'Mann Residence - Summer Sublet',
    location: 'Mann Residence',
    zone: 'Zone A - Campus',
    residenceType: 'apartment',
    buildingName: 'Mann',
    rentalType: 'sublet',
    price: 820,
    bedrooms: 1,
    bathrooms: 1,
    availableFrom: '2026-05-01',
    description: 'Great summer sublet opportunity in Mann. Apartment style living with private bedroom. May-August available.',
    amenities: ['Furnished', 'AC', 'WiFi Included', 'Gym Access'],
    images: ['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600'],
    postedBy: 'student',
    postedDate: '2026-02-02',
    contactEmail: 'student5@uottawa.ca'
  },
  {
    id: '7',
    title: 'Rideau Street Studio',
    location: 'Rideau Street',
    zone: 'Zone C - Downtown',
    residenceType: 'apartment',
    buildingName: 'Private Building',
    rentalType: 'takeover',
    price: 1100,
    bedrooms: 0,
    bathrooms: 1,
    availableFrom: '2026-04-01',
    description: 'Modern studio apartment on Rideau Street. Steps from Rideau Centre and easy transit access to campus.',
    amenities: ['Modern Kitchen', 'In-Building Gym', 'Rooftop Terrace', 'Concierge'],
    images: ['https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600'],
    postedBy: 'landlord',
    postedDate: '2026-01-30',
    contactEmail: 'landlord2@email.com'
  },
  {
    id: '8',
    title: 'Friel Street Room',
    location: 'Friel Residence',
    zone: 'Zone A - Campus',
    residenceType: 'university',
    buildingName: 'Friel',
    rentalType: 'sublet',
    price: 890,
    bedrooms: 1,
    bathrooms: 1,
    availableFrom: '2026-05-15',
    description: 'Single room in Friel residence. Recently renovated building with excellent amenities.',
    amenities: ['Renovated', 'Furnished', 'Study Rooms', 'Games Room'],
    images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600'],
    postedBy: 'student',
    postedDate: '2026-02-05',
    contactEmail: 'student6@uottawa.ca'
  }
];

export const zones = [
  { value: '', label: 'All Zones' },
  { value: 'Zone A - Campus', label: 'Zone A - Campus (On/Near Campus)' },
  { value: 'Zone B - Sandy Hill', label: 'Zone B - Sandy Hill' },
  { value: 'Zone C - Downtown', label: 'Zone C - Downtown/Byward Market' },
  { value: 'Zone D - Lowertown', label: 'Zone D - Lowertown' },
  { value: 'Zone E - Vanier', label: 'Zone E - Vanier/Overbrook' }
];

export const residenceTypes = [
  { value: '', label: 'All Types' },
  { value: 'apartment', label: 'Apartment Style' },
  { value: 'conventional', label: 'Conventional Residence' },
  { value: 'university', label: 'University Housing' }
];

export const rentalTypes = [
  { value: '', label: 'All Rental Types' },
  { value: 'sublet', label: 'Sublet (Fixed term, up to 4 months)' },
  { value: 'takeover', label: 'Lease Takeover (Full-time students only)' }
];

export const bedroomOptions = [
  { value: '', label: 'Any Bedrooms' },
  { value: '0', label: 'Studio' },
  { value: '1', label: '1 Bedroom' },
  { value: '2', label: '2 Bedrooms' },
  { value: '3', label: '3+ Bedrooms' }
];
