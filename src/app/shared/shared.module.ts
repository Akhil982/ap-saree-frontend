import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SareeCardComponent } from './components/saree-card/saree-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SareeCardComponent],
imports: [CommonModule, RouterModule],
  exports: [SareeCardComponent]
})
export class SharedModule { }
