import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { FavoritesComponent } from '../favorites.component';


@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    ModuleRoutingModule,
  ]
})
export class ModuleModule { }
