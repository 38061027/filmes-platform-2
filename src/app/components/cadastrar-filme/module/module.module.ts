import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { CadastrarFilmeComponent } from '../cadastrar-filme.component';
import { FormularioComponent } from '../../formulario/formulario.component';
import { FooterComponent } from '../../footer/footer.component';


@NgModule({
  declarations: [CadastrarFilmeComponent, FormularioComponent,FooterComponent],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    MaterialModule
  ]
})
export class ModuleModule { }
