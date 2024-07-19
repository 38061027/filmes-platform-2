import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/movie/components/movie/movie.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./components/cadastrar-filme/cadastrar-filme.module').then(
        (m) => m.CadastrarFilmeModule
      ),
  },
  { path: 'movie/:id', component: MovieComponent },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./components/favorites/favorites.module').then(
        (m) => m.FavoritesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
