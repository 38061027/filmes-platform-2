import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FooterComponent } from '../footer/footer.component';
import { FormularioComponent } from '../formulario/formulario.component';
import { CadastrarFilmeComponent } from './components/cadastrar-filmes/cadastrar-filme.component';
import { CadastrarFilmeRoutingModule } from './cadastrar-filme-routing.module';





@NgModule({
  declarations: [CadastrarFilmeComponent, FormularioComponent,FooterComponent],
  imports: [
    CommonModule,
    CadastrarFilmeRoutingModule,
    MaterialModule
  ]
})
export class CadastrarFilmeModule { }
