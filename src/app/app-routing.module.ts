import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'catalog',
    loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule)
  },
  // Catch-all redirect to fallback onto home catalog screen cleanly if route doesn't match
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
