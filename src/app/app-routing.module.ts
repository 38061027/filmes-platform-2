import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CadastrarFilmeComponent } from './components/cadastrar-filme/cadastrar-filme.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"cadastro", component:CadastrarFilmeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
