import type { Listing } from '../types';

// Parse HTML response from uOttawa housing site
function parseListingsFromHTML(html: string): Listing[] {
  const listings: Listing[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Find table rows with listing data
  const rows = doc.querySelectorAll('table tr');
  
  rows.forEach((row, index) => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 6) {
      // Parse the listing data from table cells
      const address = cells[0]?.textContent?.trim() || '';
      const zone = cells[1]?.textContent?.trim() || '';
      const propertyType = cells[2]?.textContent?.trim() || '';
      const bedrooms = cells[3]?.textContent?.trim() || '';
      const priceText = cells[4]?.textContent?.trim() || '';
      const available = cells[5]?.textContent?.trim() || '';
      
      // Skip header rows or empty rows
      if (!address || address.toLowerCase().includes('address')) return;
      
      // Extract price number
      const priceMatch = priceText.match(/\$?(\d+)/);
      const price = priceMatch ? parseInt(priceMatch[1]) : 0;
      
      // Extract bedroom count
      const bedroomMatch = bedrooms.match(/(\d+)/);
      const bedroomCount = bedroomMatch ? parseInt(bedroomMatch[1]) : 1;
      
      if (price > 0) {
        listings.push({
          id: `listing-${index}-${Date.now()}`,
          title: `${bedroomCount} Bedroom ${propertyType || 'Apartment'}`,
          address,
          zone: zone || 'Off-Campus',
          propertyType: propertyType || 'Apartment',
          rentalType: 'rental',
          price,
          bedrooms: bedroomCount,
          bathrooms: 1,
          availableFrom: available || 'Available Now',
          description: `${bedroomCount} bedroom ${propertyType?.toLowerCase() || 'apartment'} located at ${address}. ${zone ? `Zone: ${zone}.` : ''}`,
          amenities: getDefaultAmenities(propertyType),
          images: [getPlaceholderImage(bedroomCount)],
          postedBy: 'landlord',
          postedDate: new Date().toISOString().split('T')[0],
          contactEmail: ''
        });
      }
    }
  });
  
  return listings;
}

function getDefaultAmenities(propertyType: string): string[] {
  const type = (propertyType || '').toLowerCase();
  if (type.includes('furnished')) {
    return ['Furnished', 'Utilities Included', 'WiFi Available'];
  }
  if (type.includes('studio')) {
    return ['Compact Living', 'All-in-One Space'];
  }
  return ['Unfurnished', 'Utilities May Vary'];
}

function getPlaceholderImage(bedrooms: number): string {
  const images = [
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600',
    'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600'
  ];
  return images[bedrooms % images.length];
}

export interface FetchResult {
  success: boolean;
  listings: Listing[];
  error?: string;
}

export async function fetchOffCampusListings(filters: {
  zone?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: string;
}): Promise<FetchResult> {
  try {
    // Build form data for POST request
    const formData = new URLSearchParams();
    formData.append('submit', '1');
    formData.append('location', 'off_campus');
    formData.append('price_from', (filters.minPrice || 0).toString());
    formData.append('price_to', (filters.maxPrice || 9999).toString());
    
    // Use Vite proxy to avoid CORS
    const response = await fetch('/api/uottawa/search.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    let listings = parseListingsFromHTML(html);
    
    // Apply client-side filters
    if (filters.zone) {
      listings = listings.filter(l => 
        l.zone.toLowerCase().includes(filters.zone!.toLowerCase())
      );
    }
    
    if (filters.propertyType) {
      listings = listings.filter(l => 
        l.propertyType.toLowerCase().includes(filters.propertyType!.toLowerCase())
      );
    }
    
    if (filters.bedrooms) {
      const count = parseInt(filters.bedrooms);
      if (filters.bedrooms === '3') {
        listings = listings.filter(l => l.bedrooms >= 3);
      } else {
        listings = listings.filter(l => l.bedrooms === count);
      }
    }
    
    return { success: true, listings };
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    return { 
      success: false, 
      listings: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
