import { PortfolioImage } from '../types';

export interface DesignInspiration {
  id: string;
  title: string;
  url: string;
}

export const designInspirations: DesignInspiration[] = [
  {
    id: 'inspiration-01',
    title: 'Coconut White & Olive Green',
    url: 'https://iili.io/COO2qPI.jpg',
  },
  {
    id: 'inspiration-02',
    title: 'Deep Maroon & Stone Beige',
    url: 'https://iili.io/COO2ncX.jpg',
  },
  {
    id: 'inspiration-03',
    title: 'Steel Blue & Warm Greige',
    url: 'https://iili.io/COO2CFt.jpg',
  },
  {
    id: 'inspiration-04',
    title: 'Warm Oak & Charcoal Gray',
    url: 'https://iili.io/COO2fMN.jpg',
  },
  {
    id: 'inspiration-05',
    title: 'Terracotta & Muted Sage',
    url: 'https://iili.io/COO2z9s.jpg',
  },
];
