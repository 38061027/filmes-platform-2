import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FavoritesComponent } from './components/favorites/favorites.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FavoritesRoutingModule } from './favorites-routing.module';


@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    MaterialModule
  ]
})
export class FavoritesModule { }
