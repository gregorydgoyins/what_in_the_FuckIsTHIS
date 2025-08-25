import { Fund } from '../types';

// Themed funds
export const themedFunds: Fund[] = [
  {
    id: '1',
    name: 'Superhero Universe Fund',
    symbol: 'SHUF',
    type: 'themed',
    nav: 25.75,
    change: 0.45,
    percentageChange: 1.78,
    aum: 450000000,
    managementFee: 0.75,
    expenseRatio: 0.85,
    ytdReturn: 12.5,
    oneYearReturn: 18.2,
    threeYearReturn: 8.7,
    riskLevel: 'Medium',
    manager: 'Comic Capital Management',
    inceptionDate: '2019-03-15',
    description: 'Diversified fund focusing on superhero characters across all publishers and eras.',
    topHoldings: [
      { symbol: 'SPDR', name: 'Spider-Man', weight: 12.5 },
      { symbol: 'BATM', name: 'Batman', weight: 11.8 },
      { symbol: 'SUPR', name: 'Superman', weight: 10.2 },
      { symbol: 'WNDR', name: 'Wonder Woman', weight: 8.9 }
    ]
  },
  {
    id: '2',
    name: 'Golden Age Preservation Fund',
    symbol: 'GAPF',
    type: 'themed',
    nav: 45.20,
    change: 0.90,
    percentageChange: 2.03,
    aum: 320000000,
    managementFee: 1.25,
    expenseRatio: 1.35,
    ytdReturn: 8.5,
    oneYearReturn: 12.8,
    threeYearReturn: 6.2,
    riskLevel: 'Low',
    manager: 'Heritage Fund Advisors',
    inceptionDate: '2018-01-10',
    description: 'Conservative fund focused on preserving and investing in Golden Age comics.',
    topHoldings: [
      { symbol: 'ACM1', name: 'Action Comics #1', weight: 15.2 },
      { symbol: 'DTM27', name: 'Detective Comics #27', weight: 12.8 },
      { symbol: 'MRV1', name: 'Marvel Comics #1', weight: 10.5 }
    ]
  }
];

// Custom funds
export const customFunds: Fund[] = [
  {
    id: '3',
    name: 'Indie Creator Growth Fund',
    symbol: 'ICGF',
    type: 'custom',
    nav: 18.95,
    change: 0.38,
    percentageChange: 2.05,
    aum: 125000000,
    managementFee: 1.50,
    expenseRatio: 1.65,
    ytdReturn: 22.8,
    oneYearReturn: 28.5,
    riskLevel: 'High',
    manager: 'Independent Comics Capital',
    inceptionDate: '2020-09-01',
    description: 'High-growth fund targeting emerging independent creators and publishers.',
    topHoldings: [
      { symbol: 'SAGA', name: 'Saga', weight: 18.5 },
      { symbol: 'INVN', name: 'Invincible', weight: 15.2 },
      { symbol: 'WDYS', name: 'The Walking Dead', weight: 12.8 }
    ]
  }
];

// All funds combined
export const allFunds: Fund[] = [
  ...themedFunds,
  ...customFunds
];

export default allFunds;