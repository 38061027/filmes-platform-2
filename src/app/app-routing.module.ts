import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CadastrarFilmeComponent } from './components/cadastrar-filme/cadastrar-filme.component';
import { MovieComponent } from './components/movie/movie.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"cadastro", component:CadastrarFilmeComponent},
  {path:"movie/:id", component:MovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
