import { Character } from '../types';

// Heroes
export const heroes: Character[] = [
  {
    id: '1',
    name: 'Spider-Man',
    symbol: 'SPDR',
    characterType: 'hero',
    price: 3500,
    change: 175,
    percentageChange: 5.3,
    marketCap: 175000000,
    volume: 2500,
    rating: 'Strong Buy',
    firstAppearance: 'Amazing Fantasy #15 (1962)',
    publisher: 'Marvel',
    powers: ['Wall-crawling', 'Spider-sense', 'Super strength', 'Agility'],
    nemesis: 'Green Goblin',
    allies: ['Mary Jane Watson', 'Aunt May', 'Gwen Stacy'],
    popularity: 98,
    mediaAppearances: 45,
    description: 'The friendly neighborhood Spider-Man, one of Marvel\'s most iconic and beloved superheroes.',
    avatar: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'Batman',
    symbol: 'BATM',
    characterType: 'hero',
    price: 4200,
    change: 210,
    percentageChange: 5.3,
    marketCap: 210000000,
    volume: 3200,
    rating: 'Strong Buy',
    firstAppearance: 'Detective Comics #27 (1939)',
    publisher: 'DC',
    powers: ['Martial arts mastery', 'Detective skills', 'Advanced technology', 'Peak human condition'],
    nemesis: 'The Joker',
    allies: ['Robin', 'Alfred Pennyworth', 'Commissioner Gordon'],
    popularity: 99,
    mediaAppearances: 52,
    description: 'The Dark Knight of Gotham City, a symbol of justice and determination.',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop'
  }
];

// Villains
export const villains: Character[] = [
  {
    id: '3',
    name: 'The Joker',
    symbol: 'JOKR',
    characterType: 'villain',
    price: 3800,
    change: -76,
    percentageChange: -2.0,
    marketCap: 190000000,
    volume: 2800,
    rating: 'Buy',
    firstAppearance: 'Batman #1 (1940)',
    publisher: 'DC',
    powers: ['Criminal genius', 'Unpredictability', 'Chemical immunity', 'Madness'],
    nemesis: 'Batman',
    allies: ['Harley Quinn', 'Penguin'],
    popularity: 95,
    mediaAppearances: 38,
    description: 'The Clown Prince of Crime, Batman\'s greatest and most unpredictable foe.',
    avatar: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop'
  }
];

// Sidekicks
export const sidekicks: Character[] = [
  {
    id: '4',
    name: 'Robin (Tim Drake)',
    symbol: 'ROBN',
    characterType: 'sidekick',
    price: 1200,
    change: 60,
    percentageChange: 5.3,
    marketCap: 60000000,
    volume: 1200,
    rating: 'Buy',
    firstAppearance: 'Batman #436 (1989)',
    publisher: 'DC',
    powers: ['Martial arts', 'Detective skills', 'Acrobatics', 'Technology'],
    allies: ['Batman', 'Nightwing', 'Batgirl'],
    popularity: 78,
    mediaAppearances: 25,
    description: 'The third Robin, known for his detective skills and strategic thinking.',
    avatar: 'https://images.unsplash.com/photo-1559068775-eb3ad5c677bc?w=150&h=150&fit=crop'
  }
];

// Henchmen
export const henchmen: Character[] = [
  {
    id: '5',
    name: 'Generic Thug #1',
    symbol: 'THUG',
    characterType: 'henchman',
    price: 50,
    change: -1,
    percentageChange: -2.0,
    marketCap: 2500000,
    volume: 500,
    rating: 'Hold',
    firstAppearance: 'Various',
    publisher: 'Various',
    powers: ['Basic combat', 'Following orders'],
    popularity: 15,
    mediaAppearances: 5,
    description: 'A generic criminal henchman found across multiple comic universes.',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop'
  }
];

// All characters combined
export const allCharacters: Character[] = [
  ...heroes,
  ...villains,
  ...sidekicks,
  ...henchmen
];

export default allCharacters;