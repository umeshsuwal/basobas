export interface Listing {
  id: number;
  title: string;
  description: string;
  roomType: 'single' | 'shared' | 'full_flat';
  price: number;
  deposit: number;
  tenantPreference: 'bachelor' | 'family' | 'any';
  furnishing: 'furnished' | 'semi_furnished' | 'unfurnished';
  areaName: string;
  latitude: number;
  longitude: number;
  availableFrom: string;
  status: 'active' | 'rented';
  photos: { id: number; photoUrl: string }[];
}