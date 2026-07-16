export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'hair' | 'beard' | 'shave' | 'combo' | 'other';
  published: boolean;
  price: string | null; // Keep null to show "Call for pricing" as requested until confirmed
}

export interface BusinessHours {
  day: string;
  opens: string; // e.g. "10:00 AM"
  closes: string; // e.g. "7:30 PM"
  closed: boolean;
  sortOrder: number; // For sorting hours
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  yelp: string;
  googleMapsDirections: string;
}

export interface BusinessData {
  officialName: string;
  shortName: string;
  ownerName: string;
  phone: string;
  displayPhone: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  neighborhood: string;
  siteUrl: string;
  priceRange: string;
  walkInsWelcome: boolean;
  wheelchairAccessible: boolean;
  hours: BusinessHours[];
  socials: SocialLinks;
  bookingUrl: string | null;
  email: string | null;
  foundingYear: number | null;
  exactPricesVisible: boolean;
  staffBiographies: string[] | null;
  exactYearsOfExperience: number | null;
  services: Service[];
}

export const businessData: BusinessData = {
  officialName: "The Men’s Lounge Barbershop & Spa",
  shortName: "The Men’s Lounge",
  ownerName: "David",
  phone: "+16466843596",
  displayPhone: "(646) 684-3596",
  streetAddress: "311 East 76th Street",
  addressLocality: "New York",
  addressRegion: "NY",
  postalCode: "10021",
  neighborhood: "Upper East Side · Yorkville",
  siteUrl: "https://chayev.github.io/menslounge",
  priceRange: "$",
  walkInsWelcome: true,
  wheelchairAccessible: true,
  
  // NOTE FOR DEVELOPER / OWNER:
  // Weekday opening hours (Monday - Friday) are tentatively set to 10:00 AM below.
  // There are some conflicting public listings online suggesting a 9:30 AM start.
  // This must be confirmed with David before launch.
  hours: [
    { day: "Monday", opens: "10:00 AM", closes: "7:30 PM", closed: false, sortOrder: 1 },
    { day: "Tuesday", opens: "10:00 AM", closes: "7:30 PM", closed: false, sortOrder: 2 },
    { day: "Wednesday", opens: "10:00 AM", closes: "7:30 PM", closed: false, sortOrder: 3 },
    { day: "Thursday", opens: "10:00 AM", closes: "7:30 PM", closed: false, sortOrder: 4 },
    { day: "Friday", opens: "10:00 AM", closes: "7:30 PM", closed: false, sortOrder: 5 },
    { day: "Saturday", opens: "10:00 AM", closes: "7:00 PM", closed: false, sortOrder: 6 },
    { day: "Sunday", opens: "10:00 AM", closes: "6:00 PM", closed: false, sortOrder: 7 }
  ],
  
  socials: {
    instagram: "https://www.instagram.com/mensloungebarber/",
    yelp: "https://www.yelp.com/biz/the-mens-lounge-barbershop-and-spa-new-york",
    facebook: "https://www.facebook.com/p/The-Mens-Lounge-Barbershop-Spa-100063784590871/",
    googleMapsDirections: "https://www.google.com/maps/dir/?api=1&destination=The+Mens+Lounge+Barbershop+%26+Spa%2C+311+E+76th+St%2C+New+York%2C+NY+10021"
  },
  
  // UNCONFIRMED VALUES SET TO NULL (DO NOT INVENT PRICES, YEARS OF EXPERIENCE, BIOGRAPHIES, ETC.)
  bookingUrl: null,
  email: null,
  foundingYear: null,
  exactPricesVisible: false,
  staffBiographies: null,
  exactYearsOfExperience: null,
  
  services: [
    // Published/active services
    {
      id: "precision-haircut",
      name: "Precision Haircuts",
      description: "Clean, carefully tailored cuts for classic and contemporary styles.",
      category: "hair",
      published: true,
      price: null
    },
    {
      id: "scissor-cut",
      name: "Scissor Cuts & Longer Styles",
      description: "Detailed scissor work for clients who want shape, movement, and control—not simply a clipper cut.",
      category: "hair",
      published: true,
      price: null
    },
    {
      id: "beard-trim",
      name: "Beard Trim & Shape-Up",
      description: "Beard cleanup, shaping, line work, and a finish based on the customer’s requested length.",
      category: "beard",
      published: true,
      price: null
    },
    {
      id: "straight-razor-shave",
      name: "Hot-Towel Straight-Razor Shave",
      description: "A traditional shave experience with preparation, hot towels, careful razor work, and a polished finish.",
      category: "shave",
      published: true,
      price: null
    },
    {
      id: "head-shave",
      name: "Head Shave",
      description: "A close, clean head shave with professional detailing.",
      category: "shave",
      published: true,
      price: null
    },
    {
      id: "haircut-and-shave",
      name: "Haircut & Shave",
      description: "A complete grooming appointment combining a haircut with a traditional shave.",
      category: "combo",
      published: true,
      price: null
    },
    
    // Inactive/Unpublished services (for future pricing/availability checks)
    {
      id: "mens-color",
      name: "Men’s Color",
      description: "Professional grey blending or color services designed specifically for short styles.",
      category: "other",
      published: false,
      price: null
    },
    {
      id: "facial",
      name: "Facial",
      description: "A soothing skincare treatment with steam, exfoliating scrub, and moisturizing massage.",
      category: "other",
      published: false,
      price: null
    },
    {
      id: "long-hair-surcharge",
      name: "Long-hair Surcharge",
      description: "An additional charge for styles requiring extra styling time or specialized tools.",
      category: "other",
      published: false,
      price: null
    },
    {
      id: "after-hours-haircut",
      name: "After-hours Haircut",
      description: "Appointments scheduled outside of standard operating hours by special arrangement.",
      category: "other",
      published: false,
      price: null
    }
  ]
};
