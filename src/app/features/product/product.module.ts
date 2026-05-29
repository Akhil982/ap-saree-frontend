import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- 1. Make sure this import is present!
import { RouterModule } from '@angular/router';

import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routing.module';

// Assuming you have your shared card here, or import SharedModule if it lives there
import { SareeCardComponent } from '../../shared/components/saree-card/saree-card.component'; 

@NgModule({
  declarations: [
    ProductCatalogComponent,
    ProductDetailComponent,
    SareeCardComponent
  ],
  imports: [
    CommonModule,        // <-- 2. ADD THIS HERE! This activates *ngIf and *ngFor inside this module
    ProductRoutingModule,
    RouterModule
  ]
})
export class ProductModule { }