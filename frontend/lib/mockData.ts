import type { Listing } from "@/types/listing";

export const mockListings: Listing[] = [
  {
    id: 1,
    title: "Sunny 1 BHK near Pulchowk Campus",
    description: "Bright, quiet room with attached balcony.",
    roomType: "single",
    price: 8000,
    deposit: 16000,
    tenantPreference: "bachelor",
    furnishing: "furnished",
    areaName: "Pulchowk, Lalitpur",
    latitude: 27.6788,
    longitude: 85.3157,
    availableFrom: "2026-09-01",
    status: "active",
    photos: [{ id: 1, photoUrl: "https://placehold.co/600x400" }],
  },
];