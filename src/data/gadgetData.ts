import { Gadget } from '../types';

export const gadgets: Gadget[] = [
  {
    id: '1',
    name: 'Batman\'s Utility Belt',
    symbol: 'BTUB',
    price: 25000,
    change: 1250,
    percentageChange: 5.3,
    marketCap: 1250000000,
    volume: 1500,
    rating: 'Strong Buy',
    firstAppearance: 'Detective Comics #29 (1939)',
    creator: 'Bob Kane',
    owner: 'Batman',
    publisher: 'DC',
    capabilities: ['Grappling hook', 'Batarangs', 'Smoke bombs', 'First aid supplies', 'Communication devices'],
    significance: 98,
    mediaAppearances: 50,
    description: 'Batman\'s iconic utility belt containing an array of crime-fighting tools and gadgets.',
    image: 'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'Iron Man Suit Mark VII',
    symbol: 'IM7S',
    price: 45000,
    change: 2250,
    percentageChange: 5.3,
    marketCap: 2250000000,
    volume: 2200,
    rating: 'Strong Buy',
    firstAppearance: 'Tales of Suspense #39 (1963)',
    creator: 'Stan Lee',
    owner: 'Tony Stark',
    publisher: 'Marvel',
    capabilities: ['Flight', 'Repulsors', 'Unibeam', 'Enhanced strength', 'AI assistance'],
    significance: 99,
    mediaAppearances: 42,
    description: 'One of Tony Stark\'s most advanced Iron Man suits, featuring cutting-edge technology.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Captain America\'s Shield',
    symbol: 'CAPS',
    price: 18000,
    change: 720,
    percentageChange: 4.2,
    marketCap: 900000000,
    volume: 1800,
    rating: 'Buy',
    firstAppearance: 'Captain America Comics #1 (1941)',
    creator: 'Joe Simon',
    owner: 'Captain America',
    publisher: 'Marvel',
    capabilities: ['Vibranium construction', 'Perfect aerodynamics', 'Indestructible', 'Energy absorption'],
    significance: 97,
    mediaAppearances: 38,
    description: 'Captain America\'s iconic vibranium shield, a symbol of freedom and justice.',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop'
  }
];

export default gadgets;