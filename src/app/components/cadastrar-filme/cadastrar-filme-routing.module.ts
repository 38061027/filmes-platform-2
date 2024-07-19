import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { CadastrarFilmeComponent } from './components/cadastrar-filmes/cadastrar-filme.component';

const routes: Routes = [
  {path:'', component:CadastrarFilmeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrarFilmeRoutingModule { }
