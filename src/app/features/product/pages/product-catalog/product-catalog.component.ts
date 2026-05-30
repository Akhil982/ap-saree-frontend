import { Component } from '@angular/core';

export interface SareeItem {
  id: string;
  title: string;
  fabric: string;
  price: number;
  discountPrice?: number;
  primaryImage: string;
  hoverImage?: string;
  isExclusive?: boolean;
  stockCount: number;
  colors?: string[]; // 💡 CHANGED: Added '?' to make this type identical to the shared component
}

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent {
  isFilterOpen = false;
  fabrics: string[] = ['Kanchipuram Silk', 'Banarasi Silk', 'Chanderi', 'Organza', 'Georgette'];

  mockSarees: SareeItem[] = [
    {
      id: 'sar-01',
      title: 'Midnight Burgundy Kanchipuram Pure Silk Saree',
      fabric: 'Kanchipuram Silk',
      price: 16500,
      discountPrice: 19500,
      primaryImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80',
      isExclusive: true,
      stockCount: 2,
      colors: ['#800020', '#d4af37']
    },
    {
      id: 'sar-02',
      title: 'Royal Ivory Gold Banarasi Zari Brocade',
      fabric: 'Banarasi Silk',
      price: 24000,
      stockCount: 4,
      primaryImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80',
      colors: ['#fffdd0', '#e5c158']
    },
    {
      id: 'sar-03',
      title: 'Vintage Rose Organza Hand-Painted Saree',
      fabric: 'Organza',
      price: 12500,
      stockCount: 1,
      primaryImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80',
      colors: ['#ffc0cb', '#ffffff']
    }
  ];

  toggleFilterDrawer(): void {
    this.isFilterOpen = !this.isFilterOpen;
    if (this.isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const strategy = selectElement.value;
    
    if (strategy === 'low-high') {
      this.mockSarees.sort((a, b) => a.price - b.price);
    } else if (strategy === 'high-low') {
      this.mockSarees.sort((a, b) => b.price - a.price);
    }
  }

  filterByFabric(fabric: string): void { 
    console.log('Filtering collection by fabric selection layer:', fabric);
  }
  
  filterByPrice(min: number, max: number): void { 
    console.log(`Filtering matching inventory spectrum tiers: ₹${min} to ₹${max}`);
  }

  handleQuickAdd(item: SareeItem): void {
    console.log('Dispatched layout item context to application service layer:', item.title);
  }
}