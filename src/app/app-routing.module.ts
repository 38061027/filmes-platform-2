import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CadastrarFilmeComponent } from './components/cadastrar-filme/cadastrar-filme.component';
import { MovieComponent } from './components/movie/movie.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch:'full' },
  { path: "cadastro", loadChildren: () => import('./components/cadastrar-filme/module/module.module').then(m => m.ModuleModule) },
  { path: "movie/:id", component: MovieComponent },
  { path: "favorites", loadChildren: () => import('./components/favorites/module/module.module').then(m => m.ModuleModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
