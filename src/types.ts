export interface PhoneColor {
  id: string;
  name: string;
  hex: string;
  bgClass: string;
  colorNamePt: string;
}

export interface PhoneStorage {
  size: string;
  priceMultiplier: number;
  priceAdjustment: number;
}

export interface PhoneSpecs {
  cpu: string;
  camera: string;
  battery: string;
  screen: string;
}

export interface Smartphone {
  id: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  colors: PhoneColor[];
  storages: PhoneStorage[];
  specs: PhoneSpecs;
  rating: number;
  reviewsCount: number;
  image: string;
  featured: boolean;
  benchmark: {
    cpu: number; // percentage/score
    gpu: number;
    battery: number;
  };
}

export interface CartItem {
  id: string; // unique cart item key (phoneId + colorId + storageSize)
  phoneId: string;
  name: string;
  color: PhoneColor;
  storage: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
