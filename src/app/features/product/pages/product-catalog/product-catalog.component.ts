import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  colors?: string[]; 
}

export interface SwatchColor {
  name: string;
  hex: string;
  isLight?: boolean;
}

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {
  isFilterOpen = false;
  fabrics: string[] = ['Kanchipuram Silk', 'Banarasi Silk', 'Chanderi', 'Organza', 'Georgette'];

  colors: SwatchColor[] = [
    { name: 'Midnight Burgundy', hex: '#3d0c1b', isLight: false },
    { name: 'Royal Navy', hex: '#1d2244', isLight: false },
    { name: 'Pure Emerald', hex: '#0a4223', isLight: false },
    { name: 'Antique Gold', hex: '#d4af37', isLight: false },
    { name: 'Ivory Cream', hex: '#fdfbf7', isLight: true },
    { name: 'Blush Pink', hex: '#e8c5c8', isLight: true }
  ];

  // 💡 PRICE SLIDER RANGE STATE TOKENS
  minPriceLimit = 0;
  maxPriceLimit = 50000;
  currentMinPrice = 0;
  currentMaxPrice = 50000;
  
  // Percentages to fill the active slider bar accent line background color
  minPercent = 0;
  maxPercent = 100;

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
      colors: ['#3d0c1b', '#1d2244', '#0a4223', '#d4af37']
    },
    {
      id: 'sar-02',
      title: 'Royal Ivory Gold Banarasi Zari Brocade',
      fabric: 'Banarasi Silk',
      price: 24000,
      stockCount: 4,
      primaryImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80',
      colors: ['#fdfbf7', '#d4af37']
    },
    {
      id: 'sar-03',
      title: 'Vintage Rose Organza Hand-Painted Saree',
      fabric: 'Organza',
      price: 12500,
      stockCount: 1,
      primaryImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80',
      colors: ['#e8c5c8', '#a22a45', '#3d0c1b', '#0a4223']
    }
  ];

  ngOnInit(): void {
    this.updateSliderTrackFill();
  }

  // 💡 CALCULATION ENGINE: Dynamically maps background percentage bounds for the highlight bar
  updateSliderTrackFill(): void {
    const totalRange = this.maxPriceLimit - this.minPriceLimit;
    this.minPercent = ((this.currentMinPrice - this.minPriceLimit) / totalRange) * 100;
    this.maxPercent = ((this.currentMaxPrice - this.minPriceLimit) / totalRange) * 100;
  }

  onMinPriceInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let val = parseInt(input.value, 10);
    
    // Prevent min thumb from sliding past the max thumb minus a tiny safety gap
    if (val >= this.currentMaxPrice - 2000) {
      val = this.currentMaxPrice - 2000;
      input.value = val.toString();
    }
    this.currentMinPrice = val;
    this.updateSliderTrackFill();
    this.filterByPrice(this.currentMinPrice, this.currentMaxPrice);
  }

  onMaxPriceInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let val = parseInt(input.value, 10);

    // Prevent max thumb from sliding lower than the min thumb plus a safety gap
    if (val <= this.currentMinPrice + 2000) {
      val = this.currentMinPrice + 2000;
      input.value = val.toString();
    }
    this.currentMaxPrice = val;
    this.updateSliderTrackFill();
    this.filterByPrice(this.currentMinPrice, this.currentMaxPrice);
  }

  toggleFilterDrawer(): void {
    this.isFilterOpen = !this.isFilterOpen;
    document.body.style.overflow = this.isFilterOpen ? 'hidden' : '';
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

  filterByFabric(fabric: string): void { console.log('Fabric filter applied:', fabric); }
  filterByColor(colorName: string): void { console.log('Color filter applied:', colorName); }
  
  filterByPrice(min: number, max: number): void { 
    console.log(`Live Filtering Price Range Array Bound Strategy: ₹${min} — ₹${max}`);
  }

  handleQuickAdd(item: SareeItem): void { console.log('Item Quick-Added:', item.title); }
}