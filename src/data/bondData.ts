import { Bond } from '../types';

// Creator bonds
export const creatorBonds: Bond[] = [
  {
    id: '1',
    name: 'Todd McFarlane Creative Bond',
    symbol: 'TMFB',
    type: 'creator',
    price: 1050.25,
    change: 21.05,
    percentageChange: 2.04,
    yield: 4.2,
    maturity: '2029-12-31',
    creditRating: 'AA',
    issuer: 'McFarlane Entertainment',
    couponRate: 4.0,
    faceValue: 1000,
    volume: 500,
    description: 'Bond backed by Todd McFarlane\'s intellectual property and royalty streams.',
    riskLevel: 'Low',
    interestFrequency: 'Semi-Annual'
  },
  {
    id: '2',
    name: 'Jim Lee Creative Bond',
    symbol: 'JLEB',
    type: 'creator',
    price: 1035.75,
    change: 15.75,
    percentageChange: 1.54,
    yield: 3.8,
    maturity: '2028-06-30',
    creditRating: 'AAA',
    issuer: 'DC Entertainment',
    couponRate: 3.5,
    faceValue: 1000,
    volume: 750,
    description: 'Premium bond backed by Jim Lee\'s executive position and creative works.',
    riskLevel: 'Low',
    interestFrequency: 'Annual'
  }
];

// Publisher bonds
export const publisherBonds: Bond[] = [
  {
    id: '3',
    name: 'Marvel Entertainment Bond',
    symbol: 'MRVLB',
    type: 'publisher',
    price: 1035.50,
    change: 8.25,
    percentageChange: 0.80,
    yield: 3.2,
    maturity: '2027-03-15',
    creditRating: 'AAA',
    issuer: 'Marvel Entertainment',
    couponRate: 3.0,
    faceValue: 1000,
    volume: 1200,
    description: 'Corporate bond issued by Marvel Entertainment for expansion and content development.',
    riskLevel: 'Low',
    interestFrequency: 'Semi-Annual'
  },
  {
    id: '4',
    name: 'DC Comics Corporate Bond',
    symbol: 'DCCB',
    type: 'publisher',
    price: 1028.80,
    change: 5.60,
    percentageChange: 0.55,
    yield: 3.5,
    maturity: '2026-09-30',
    creditRating: 'AA',
    issuer: 'DC Entertainment',
    couponRate: 3.25,
    faceValue: 1000,
    volume: 950,
    description: 'Corporate bond from DC Comics to fund new projects and digital initiatives.',
    riskLevel: 'Low',
    interestFrequency: 'Quarterly'
  }
];

// Specialty bonds
export const specialtyBonds: Bond[] = [
  {
    id: '5',
    name: 'Golden Age Comics Index Bond',
    symbol: 'GACB',
    type: 'specialty',
    price: 1065.25,
    change: 13.25,
    percentageChange: 1.26,
    yield: 5.2,
    maturity: '2030-12-31',
    creditRating: 'A',
    issuer: 'Heritage Comic Finance',
    couponRate: 5.0,
    faceValue: 1000,
    volume: 400,
    description: 'Bond with returns linked to the performance of Golden Age comic book values.',
    riskLevel: 'Medium',
    interestFrequency: 'Annual'
  },
  {
    id: '6',
    name: 'Comic Convention Revenue Bond',
    symbol: 'CCRB',
    type: 'specialty',
    price: 985.40,
    change: -9.85,
    percentageChange: -0.99,
    yield: 6.8,
    maturity: '2025-08-15',
    creditRating: 'BBB',
    issuer: 'Convention Finance Corp',
    couponRate: 6.5,
    faceValue: 1000,
    volume: 300,
    description: 'Bond backed by comic convention revenue streams and licensing agreements.',
    riskLevel: 'Medium',
    interestFrequency: 'Quarterly'
  }
];

// All bonds combined
export const allBonds: Bond[] = [
  ...creatorBonds,
  ...publisherBonds,
  ...specialtyBonds
];

export default allBonds;