import type { Product } from '../types';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'category-az';

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Sort: Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'category-az', label: 'Category: A–Z' },
];

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products];
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'category-az':
      return list.sort((a, b) => a.category.localeCompare(b.category));
    default:
      return list;
  }
}
