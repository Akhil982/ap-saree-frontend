import { Component } from '@angular/core';
import { SareeItem } from '../../../../shared/components/saree-card/saree-card.component';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent {
  isFilterOpen: boolean = false;
  fabrics: string[] = ['Kanchipuram Silk', 'Banarasi Silk', 'Chanderi', 'Organza', 'Georgette'];

  // Showcase layout testing dataset
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
    }
  ];

  toggleFilterDrawer(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  onSortChange(event: any): void {
    const strategy = event.target.value;
    if (strategy === 'low-high') {
      this.mockSarees.sort((a, b) => a.price - b.price);
    } else if (strategy === 'high-low') {
      this.mockSarees.sort((a, b) => b.price - a.price);
    }
  }

  filterByFabric(fabric: string): void { /* Connected to backend database endpoints later */ }
  filterByPrice(min: number, max: number): void { /* Connected to backend database endpoints later */ }

  handleQuickAdd(item: SareeItem): void {
    console.log('Dispatched layout item context to application service layer:', item.title);
  }
}