import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Ensure HttpClientModule is imported in your AppModule
import { SareeItem } from 'src/app/shared/components/saree-card/saree-card.component';

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
  
  // Master copy from backend API database instance
  allSarees: SareeItem[] = [];
  // Screen data representation pipeline altered by search filters and sorters
  mockSarees: SareeItem[] = [];

  // Dynamic filter arrays generated from the backend data
  fabrics: string[] = [];
  colors: SwatchColor[] = [];

  // Selected filter states
  selectedFabrics: Set<string> = new Set();
  selectedColors: Set<string> = new Set();

  // Price Slider Configuration Values 
  minPriceLimit = 0;
  maxPriceLimit = 50000;
  currentMinPrice = 0;
  currentMaxPrice = 50000;
  minPercent = 0;
  maxPercent = 100;

  // Static fallback palette lookups for hex matches
  private colorPaletteMap: { [key: string]: { name: string, isLight: boolean } } = {
    '#3D0C1B': { name: 'Midnight Burgundy', isLight: false },
    '#3d0c1b': { name: 'Midnight Burgundy', isLight: false },
    '#1D2244': { name: 'Royal Navy', isLight: false },
    '#1d2244': { name: 'Royal Navy', isLight: false },
    '#0A4223': { name: 'Pure Emerald', isLight: false },
    '#0a4223': { name: 'Pure Emerald', isLight: false },
    '#D4AF37': { name: 'Antique Gold', isLight: false },
    '#d4af37': { name: 'Antique Gold', isLight: false },
    '#FDFBF7': { name: 'Ivory Cream', isLight: true },
    '#fdfbf7': { name: 'Ivory Cream', isLight: true },
    '#E8C5C8': { name: 'Blush Pink', isLight: true },
    '#e8c5c8': { name: 'Blush Pink', isLight: true },
    '#A22A45': { name: 'Crimson Red', isLight: false },
    '#900C3F': { name: 'Heritage Maroon', isLight: false },
    '#C70039': { name: 'Chili Ruby', isLight: false },
    '#FFC300': { name: 'Sun Gold', isLight: true },
    '#A2B9B2': { name: 'Mint Sage', isLight: true },
    '#E2ECE9': { name: 'Soft Mist', isLight: true },
    '#FFFFFF': { name: 'Pure White', isLight: true },
    '#E5A93C': { name: 'Mustard Gold', isLight: false },
    '#333333': { name: 'Charcoal Black', isLight: false },
    '#9E2A2B': { name: 'Earthy Terracotta', isLight: false },
    '#005F73': { name: 'Deep Peacock', isLight: false },
    '#0A9396': { name: 'Teal Lagoon', isLight: false },
    '#EE9B00': { name: 'Amber Gold', isLight: false },
    '#4A5568': { name: 'Slate Indigo', isLight: false },
    '#718096': { name: 'Pastel Slate', isLight: false },
    '#E2E8F0': { name: 'Silver Ash', isLight: true },
    '#C46210': { name: 'Burnt Terracotta', isLight: false },
    '#D2B48C': { name: 'Tan Khaki', isLight: true },
    '#5C4033': { name: 'Dark Walnut', isLight: false },
    '#111111': { name: 'Jet Black', isLight: false },
    '#E5E5E5': { name: 'Gota Platinum', isLight: true }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCatalogData();
  }

  fetchCatalogData(): void {
    // Replace with your real API URL endpoint (e.g., 'http://localhost:8080/api/products')
    this.http.get<SareeItem[]>('https://ap-saree-store.onrender.com/ap-saree-store/api/products').subscribe({
      next: (data) => {
        this.allSarees = data;
        this.mockSarees = [...data];
        
        this.calculatePriceLimits();
        this.buildDynamicFilters();
        this.updateSliderTrackFill();
      },
      error: (err) => {
        console.error('Failed to load live premium items pipeline:', err);
      }
    });
  }

  buildDynamicFilters(): void {
    const rawFabrics = new Set<string>();
    const rawColors = new Set<string>();

    this.allSarees.forEach(saree => {
      if (saree.fabric) rawFabrics.add(saree.fabric);
      saree.colors?.forEach(colorHex => rawColors.add(colorHex));
    });

    this.fabrics = Array.from(rawFabrics).sort();
    
    this.colors = Array.from(rawColors).map(hex => {
      const info = this.colorPaletteMap[hex];
      return {
        name: info ? info.name : `Palette ${hex}`,
        hex: hex,
        isLight: info ? info.isLight : false
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }

  calculatePriceLimits(): void {
    if (this.allSarees.length === 0) return;
    const prices = this.allSarees.map(s => s.price);
    
    this.minPriceLimit = Math.floor(Math.min(...prices) / 1000) * 1000;
    this.maxPriceLimit = Math.ceil(Math.max(...prices) / 1000) * 1000;
    
    this.currentMinPrice = this.minPriceLimit;
    this.currentMaxPrice = this.maxPriceLimit;
  }

  updateSliderTrackFill(): void {
    const totalRange = this.maxPriceLimit - this.minPriceLimit;
    if (totalRange === 0) {
      this.minPercent = 0;
      this.maxPercent = 100;
      return;
    }
    this.minPercent = ((this.currentMinPrice - this.minPriceLimit) / totalRange) * 100;
    this.maxPercent = ((this.currentMaxPrice - this.minPriceLimit) / totalRange) * 100;
  }

  applyActiveFilters(): void {
    this.mockSarees = this.allSarees.filter(saree => {
      const matchesFabric = this.selectedFabrics.size === 0 || this.selectedFabrics.has(saree.fabric);
      
      const matchesColor = this.selectedColors.size === 0 || 
        saree.colors?.some(c => this.selectedColors.has(c));

      const matchesPrice = saree.price >= this.currentMinPrice && saree.price <= this.currentMaxPrice;

      return matchesFabric && matchesColor && matchesPrice;
    });
  }

  filterByFabric(fabric: string): void {
    if (this.selectedFabrics.has(fabric)) {
      this.selectedFabrics.delete(fabric);
    } else {
      this.selectedFabrics.add(fabric);
    }
    this.applyActiveFilters();
  }

  filterByColor(colorHex: string): void {
    if (this.selectedColors.has(colorHex)) {
      this.selectedColors.delete(colorHex);
    } else {
      this.selectedColors.add(colorHex);
    }
    this.applyActiveFilters();
  }

  onMinPriceInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let val = parseInt(input.value, 10);
    
    if (val >= this.currentMaxPrice - 1000) {
      val = this.currentMaxPrice - 1000;
      input.value = val.toString();
    }
    this.currentMinPrice = val;
    this.updateSliderTrackFill();
    this.applyActiveFilters();
  }

  onMaxPriceInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let val = parseInt(input.value, 10);

    if (val <= this.currentMinPrice + 1000) {
      val = this.currentMinPrice + 1000;
      input.value = val.toString();
    }
    this.currentMaxPrice = val;
    this.updateSliderTrackFill();
    this.applyActiveFilters();
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const strategy = selectElement.value;
    if (strategy === 'low-high') {
      this.mockSarees.sort((a, b) => a.price - b.price);
    } else if (strategy === 'high-low') {
      this.mockSarees.sort((a, b) => b.price - a.price);
    } else {
      this.applyActiveFilters(); // Standard featured display setup resetting bounds
    }
  }

  toggleFilterDrawer(): void {
    this.isFilterOpen = !this.isFilterOpen;
    document.body.style.overflow = this.isFilterOpen ? 'hidden' : '';
  }

  handleQuickAdd(item: SareeItem): void { 
    console.log('Item Quick-Added:', item.title); 
  }
}