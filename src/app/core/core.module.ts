import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [NavComponent],
})
export class CoreModule {}
