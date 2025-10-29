export enum Page {
  Home = 'home',
  ShelterFinder = 'shelter-finder',
  RegisterShelter = 'register-shelter',
  Donate = 'donate',
  Volunteer = 'volunteer',
  Awareness = 'awareness',
}

export enum Language {
  EN = 'en',
  HI = 'hi',
  TA = 'ta',
}

export interface Shelter {
  id: number;
  name: string;
  address: string;
  city: string;
  contact: string;
  capacity: number;
  bedsAvailable: number;
  services: string[];
  forWhom: ('men' | 'women' | 'families' | 'children')[];
  verified: boolean;
  lat: number;
  lng: number;
  distance?: number;
}

export interface NewShelterData {
    name: string;
    address: string;
    city: string;
    contact: string;
    capacity: number;
    services: string[];
    forWhom: ('men' | 'women' | 'families' | 'children')[];
    // Dummy location for now, a real app would use a geocoding service
    lat: number; 
    lng: number;
}

export interface Volunteer {
    id: number;
    name: string;
    email: string;
    phone: string;
    skills: string[];
    availability: string;
}

export interface Donation {
    id: number;
    name: string;
    amount: number;
    date: string;
}

export interface PendingShelter extends Shelter {
    status: 'pending' | 'approved' | 'rejected';
}