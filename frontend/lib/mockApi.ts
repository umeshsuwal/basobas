import { mockListings } from "./mockData";

type ListingFilters = {
  roomType?: (typeof mockListings)[number]["roomType"];
  tenantPreference?: (typeof mockListings)[number]["tenantPreference"];
};

export async function getListings(filters: ListingFilters = {}) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  let results = [...mockListings];
  if (filters.roomType) {
    results = results.filter((listing) => listing.roomType === filters.roomType);
  }
  if (filters.tenantPreference) {
    results = results.filter(
      (listing) => listing.tenantPreference === filters.tenantPreference,
    );
  }
  return results;
}

export async function getListingById(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockListings.find((listing) => listing.id === id);
}