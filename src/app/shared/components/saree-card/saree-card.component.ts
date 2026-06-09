import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface SareeItem {
  id: string;
  title: string;
  fabric: string;
  price: number;
  discountPrice?: number | null; // 🌟 Added '| null' to handle API structure
  primaryImage: string;
  hoverImage?: string | null;    // 🌟 Added '| null' here as well for safety
  isExclusive?: boolean;
  stockCount: number;
  colors?: string[]; 
}

@Component({
  selector: 'app-saree-card',
  templateUrl: './saree-card.component.html',
  styleUrls: ['./saree-card.component.scss']
})
export class SareeCardComponent {
  @Input() saree!: SareeItem;
  @Output() addToCart = new EventEmitter<SareeItem>();

  getDiscountPercentage(current: number, original: number): number {
    return Math.round(((original - current) / original) * 100);
  }

  onQuickAdd(event: Event): void {
    event.stopPropagation(); 
    if (this.saree.stockCount > 0) {
      this.addToCart.emit(this.saree);
    }
  }
}