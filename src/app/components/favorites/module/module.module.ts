import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { FavoritesComponent } from '../favorites.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    MaterialModule
  ]
})
export class ModuleModule { }
