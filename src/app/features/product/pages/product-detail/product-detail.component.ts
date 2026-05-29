import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  userPhotos?: string[];
}

interface SimilarSaree {
  id: string;
  title: string;
  fabric: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
}

interface SareeDetail {
  id: string;
  title: string;
  fabric: string;
  price: number;
  originalPrice?: number;
  description: string;
  isHandloom: boolean;
  stockCount: number;
  images: string[];
  ratingAverage: number;
  totalRatingsCount: number;
  specs: {
    length: string;
    blouseIncluded: boolean;
    blouseLength: string;
    weave: string;
    care: string;
  };
  reviews: Review[];
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product!: SareeDetail;
  similarProducts: SimilarSaree[] = [];
  activeImage: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadMockProduct();
    this.loadSimilarProducts();
    
    if (this.product && this.product.images && this.product.images.length > 0) {
      this.activeImage = this.product.images[0];
    }
  }

  loadMockProduct(): void {
    this.product = {
      id: 'sar-01',
      title: 'Midnight Burgundy Kanchipuram Pure Silk Saree',
      fabric: 'Kanchipuram Silk',
      price: 16500,
      originalPrice: 19500,
      isHandloom: true,
      stockCount: 2,
      ratingAverage: 4.8,
      totalRatingsCount: 34,
      description: 'Exquisitely hand-woven by master craftsmen, this stunning pure silk masterpiece features an elegant gold zari border and an opulent floral pallu. Perfectly curated for premium wedding celebrations and heritage occasions.',
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80'
      ],
      specs: {
        length: '5.5 Meters',
        blouseIncluded: true,
        blouseLength: '80 Centimeters',
        weave: 'Double Warp Handloom Jacquard',
        care: 'Dry Clean Only'
      },
      reviews: [
        {
          id: 'rev-101',
          reviewerName: 'Priya R.',
          rating: 5,
          date: 'May 12, 2026',
          comment: 'Absolutely breathtaking! The pure zari gleams beautifully under ambient lights, and the weight of the silk proves its premium handloom grade. Wore it for my anniversary and received endless compliments.',
          verifiedPurchase: true,
          userPhotos: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150&q=80']
        },
        {
          id: 'rev-102',
          reviewerName: 'Ananya S.',
          rating: 4,
          date: 'April 28, 2026',
          comment: 'The drape is remarkably soft and forms crisp pleats easily. The burgundy shade looks slightly darker indoors than the model profile pictures, but it transforms magnificently under direct natural sunlight.',
          verifiedPurchase: true,
          userPhotos: []
        }
      ]
    };
  }

  loadSimilarProducts(): void {
    this.similarProducts = [
      {
        id: 'sar-02',
        title: 'Crimson Red Banarasi Brocade Silk Saree',
        fabric: 'Banarasi Silk',
        price: 18200,
        originalPrice: 21000,
        imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80',
        rating: 4.9
      },
      {
        id: 'sar-03',
        title: 'Deep Teal Handwoven Mysore Silk Saree',
        fabric: 'Mysore Silk',
        price: 14000,
        imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&q=80',
        rating: 4.7
      }
    ];
  }

  setActiveImage(imageUrl: string): void {
    this.activeImage = imageUrl;
  }

  calculateDiscount(): number {
    if (!this.product || !this.product.originalPrice || this.product.originalPrice <= this.product.price) {
      return 0;
    }
    return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
  }

  addToCart(): void {
    console.log('Product added to checkout basket infrastructure:', this.product.title);
  }
}