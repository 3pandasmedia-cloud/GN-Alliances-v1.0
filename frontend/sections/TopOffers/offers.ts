// sections/TopOffers/offers.ts

export interface Offer {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  merchant: string;
  cta: string;
}

export const offers: Offer[] = [
  {
    id: 1,
    title: "Flat ₹200 OFF Flights",
    subtitle: "Flat ₹500 OFF Hotels",
    merchant: "Akbar Travels",
    image: "/offers/akbar-travels.jpg",
    cta: "Unlock Offer",
  },
  {
    id: 2,
    title: "Buy 1 Get 1 Free",
    subtitle: "On Selected Burgers",
    merchant: "KFC",
    image: "/offers/kfc.jpg",
    cta: "Unlock Offer",
  },
  {
    id: 3,
    title: "Flat 40% OFF",
    subtitle: "Exclusive Member Offer",
    merchant: "Levi's",
    image: "/offers/levis.jpg",
    cta: "Unlock Offer",
  },

  // Duplicate for development only
  {
    id: 4,
    title: "Flat ₹200 OFF Flights",
    subtitle: "Flat ₹500 OFF Hotels",
    merchant: "Akbar Travels",
    image: "/offers/akbar-travels.jpg",
    cta: "Unlock Offer",
  },
  {
    id: 5,
    title: "Buy 1 Get 1 Free",
    subtitle: "On Selected Burgers",
    merchant: "KFC",
    image: "/offers/kfc.jpg",
    cta: "Unlock Offer",
  },
  {
    id: 6,
    title: "Flat 40% OFF",
    subtitle: "Exclusive Member Offer",
    merchant: "Levi's",
    image: "/offers/levis.jpg",
    cta: "Unlock Offer",
  },

  {
    id: 7,
    title: "Flat ₹200 OFF Flights",
    subtitle: "Flat ₹500 OFF Hotels",
    merchant: "Akbar Travels",
    image: "/offers/akbar-travels.jpg",
    cta: "Unlock Offer",
  },
  {
    id: 8,
    title: "Buy 1 Get 1 Free",
    subtitle: "On Selected Burgers",
    merchant: "KFC",
    image: "/offers/kfc.jpg",
    cta: "Unlock Offer",
  },
  {
    id: 9,
    title: "Flat 40% OFF",
    subtitle: "Exclusive Member Offer",
    merchant: "Levi's",
    image: "/offers/levis.jpg",
    cta: "Unlock Offer",
  },
];