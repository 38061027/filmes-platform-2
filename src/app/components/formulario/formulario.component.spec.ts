import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioComponent } from './formulario.component';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MaterialModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule],
      declarations: [ FormularioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Deve resetar o formulário',()=>{
    let spiedComponent = spyOn(component,'reiniciarForm').and.callThrough()
    component.reiniciarForm()

    expect(spiedComponent).toHaveBeenCalledTimes(1)
  })
});
