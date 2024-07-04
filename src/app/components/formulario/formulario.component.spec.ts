import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioComponent } from './formulario.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let service: SharedService;
  let router: Router;

  
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [FormularioComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(SharedService);
    router = TestBed.inject(Router);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve resetar o formulário', () => {
    let spiedComponent = spyOn(component, 'reiniciarForm').and.callThrough()
    component.reiniciarForm()

    expect(spiedComponent).toHaveBeenCalledTimes(1)
  })

  it('Deve retornar que o fomulário é invalido', () =>{
    const result = component.isValidForm()
    
    expect(result).toBe(false)
  })
  
  it('Deve retornar que o formulário é válido', ()=>{

    component.cadastro.controls['titulo'].setValue('Donzela')
    component.cadastro.controls['urlFoto'].setValue('https://m.media-amazon.com/images/S/pv-target-images/28ba30adb15abcf10253d4c9e07575a206dfd89e48c37714b5f8603ce1575bf9.jpg')
    component.cadastro.controls['dtLancamento'].setValue('2010-06-09T03:00:00.000Z')
    component.cadastro.controls['descricao'].setValue('A princesa Elodie, que acredita que vai se casar com o príncipe Henry, descobre que está sendo sacrificada a um dragão.')
    component.cadastro.controls['nota'].setValue('7')
    component.cadastro.controls['urlIMDb'].setValue('https://www.imdb.com/title/tt13452446/?ref_=nv_sr_srsg_3_tt_3_nm_5_q_dam')
    component.cadastro.controls['genero'].setValue('Aventura')

    const result = component.isValidForm()
    expect(result).toBe(true)
  })


  it('should call editMovie on submit when id is defined', () => {
    const editMovieSpy = spyOn(service, 'editMovie').and.returnValue(of({
      "id": "13",
      "titulo": "Gente Grande",
      "urlFoto": "https://m.media-amazon.com/images/S/pv-target-images/28ba30adb15abcf10253d4c9e07575a206dfd89e48c37714b5f8603ce1575bf9.jpg",
      "dtLancamento": "2010-06-09T03:00:00.000Z",
      "descricao": "Após a morte do treinador de basquete, cinco amigos e excompanheiros se reúnem para o feriado do 4 de Julho.",
      "nota": 6,
      "urlIMDb": "https://www.imdb.com/title/tt1375670/?ref_=nv_sr_srsg_5_tt_6_nm_2_q_gente%2520",
      "genero": "Comédia"
    }));
    component.id = '15';

    component.cadastro.controls['titulo'].setValue('Donzela');
    component.cadastro.controls['urlFoto'].setValue('https://m.media-amazon.com/images/S/pv-target-images/28ba30adb15abcf10253d4c9e07575a206dfd89e48c37714b5f8603ce1575bf9.jpg');
    component.cadastro.controls['dtLancamento'].setValue('2010-06-09T03:00:00.000Z');
    component.cadastro.controls['descricao'].setValue('A princesa Elodie, que acredita que vai se casar com o príncipe Henry, descobre que está sendo sacrificada a um dragão.');
    component.cadastro.controls['nota'].setValue('7');
    component.cadastro.controls['urlIMDb'].setValue('https://www.imdb.com/title/tt13452446/?ref_=nv_sr_srsg_3_tt_3_nm_5_q_dam');
    component.cadastro.controls['genero'].setValue('Aventura');

    component.onSubmit();

    expect(editMovieSpy).toHaveBeenCalledWith(component.cadastro.value, '15');
  });

  it('should call sendMovie on submit when id is not defined', () => {
    const sendMovieSpy = spyOn(service, 'sendMovie').and.returnValue(of({
      "id": "13",
      "titulo": "Gente Grande",
      "urlFoto": "https://m.media-amazon.com/images/S/pv-target-images/28ba30adb15abcf10253d4c9e07575a206dfd89e48c37714b5f8603ce1575bf9.jpg",
      "dtLancamento": "2010-06-09T03:00:00.000Z",
      "descricao": "Após a morte do treinador de basquete, cinco amigos e excompanheiros se reúnem para o feriado do 4 de Julho.",
      "nota": 6,
      "urlIMDb": "https://www.imdb.com/title/tt1375670/?ref_=nv_sr_srsg_5_tt_6_nm_2_q_gente%2520",
      "genero": "Comédia"
    }));
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.id = undefined;

    component.cadastro.controls['titulo'].setValue('Donzela');
    component.cadastro.controls['urlFoto'].setValue('https://m.media-amazon.com/images/S/pv-target-images/28ba30adb15abcf10253d4c9e07575a206dfd89e48c37714b5f8603ce1575bf9.jpg');
    component.cadastro.controls['dtLancamento'].setValue('2010-06-09T03:00:00.000Z');
    component.cadastro.controls['descricao'].setValue('A princesa Elodie, que acredita que vai se casar com o príncipe Henry, descobre que está sendo sacrificada a um dragão.');
    component.cadastro.controls['nota'].setValue('7');
    component.cadastro.controls['urlIMDb'].setValue('https://www.imdb.com/title/tt13452446/?ref_=nv_sr_srsg_3_tt_3_nm_5_q_dam');
    component.cadastro.controls['genero'].setValue('Aventura');

    component.onSubmit();

    expect(sendMovieSpy).toHaveBeenCalledWith(component.cadastro.value);
    expect(navigateSpy).toHaveBeenCalledWith('');
  });
});
