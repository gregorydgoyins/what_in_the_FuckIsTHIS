import { Location } from '../types';

// Hangouts (Hero bases)
export const hangouts: Location[] = [
  {
    id: '1',
    name: 'Batcave',
    symbol: 'BTCV',
    locationType: 'hangout',
    price: 15000,
    change: 750,
    percentageChange: 5.3,
    marketCap: 750000000,
    volume: 1200,
    rating: 'Strong Buy',
    firstAppearance: 'Batman #12 (1942)',
    publisher: 'DC',
    associatedCharacters: ['Batman', 'Robin', 'Alfred'],
    significance: 98,
    mediaAppearances: 45,
    description: 'Batman\'s secret headquarters beneath Wayne Manor, featuring advanced technology and crime-fighting equipment.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'X-Mansion',
    symbol: 'XMAN',
    locationType: 'hangout',
    price: 12000,
    change: 480,
    percentageChange: 4.2,
    marketCap: 600000000,
    volume: 950,
    rating: 'Buy',
    firstAppearance: 'X-Men #1 (1963)',
    publisher: 'Marvel',
    associatedCharacters: ['Professor X', 'Wolverine', 'Cyclops', 'Storm'],
    significance: 95,
    mediaAppearances: 35,
    description: 'Xavier\'s School for Gifted Youngsters, home and training ground for the X-Men.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'
  }
];

// Hideouts (Villain lairs)
export const hideouts: Location[] = [
  {
    id: '3',
    name: 'Lex Luthor\'s Lair',
    symbol: 'LEXL',
    locationType: 'hideout',
    price: 8500,
    change: -170,
    percentageChange: -2.0,
    marketCap: 425000000,
    volume: 800,
    rating: 'Hold',
    firstAppearance: 'Action Comics #23 (1940)',
    publisher: 'DC',
    associatedCharacters: ['Lex Luthor', 'Mercy Graves'],
    significance: 88,
    mediaAppearances: 28,
    description: 'Lex Luthor\'s high-tech headquarters in Metropolis, a symbol of corporate villainy.',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop'
  }
];

// All locations combined
export const allLocations: Location[] = [
  ...hangouts,
  ...hideouts
];

export default allLocations;