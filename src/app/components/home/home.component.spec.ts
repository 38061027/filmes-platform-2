import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule],
      declarations: [HomeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should return true if the movie is a favorite', () => {
    component.movies = [
      {
        "id": "10",
        "titulo": "Mistério no Mediterrâneo 2",
        "urlFoto": "https://m.media-amazon.com/images/M/MV5BNTA2YTI5YjUtZWI4Zi00NWQ5LWFiYmEtOTBmNTUyNDAwNjllXkEyXkFqcGdeQXVyNjIzNzM4NzA@._V1_UX182_CR0,0,182,268_AL_.jpg",
        "dtLancamento": "2019-06-14T03:00:00.000Z",
        "descricao": "A New York cop and his wife go on a European vacation to reinvigorate the spark in their marriage, but end up getting framed and on the run for the death of an elderly billionaire.",
        "nota": 6,
        "urlIMDb": "https://www.imdb.com/title/tt1618434/",
        "genero": "Comédia"
      },
      {
        "id": "17",
        "titulo": "Carros",
        "urlFoto": "https://play-lh.googleusercontent.com/kHt8qbche40zkE6yZwA8IUe5ARINp4PjrJ5mi622GEzQFYWCaGTQDAl58rrRKRKyhnD2=w240-h480-rw",
        "dtLancamento": "2006-06-14T03:00:00.000Z",
        "descricao": "Um carro de corridas chamado Relâmpago McQueen é desviado para Radiator Springs, onde ele encontra o verdadeiro significado da amizade e da família.",
        "nota": 7.2,
        "urlIMDb": "https://www.imdb.com/title/tt0317219/?ref_=nv_sr_srsg_0_tt_8_nm_0_in_0_q_carros",
        "genero": "Animação"
      }
    ];
    
    const result = component.isFavorite('17');
    expect(result).toBe(true);
  });

  it('Deve retornar falso se o filme não está nos favoritos', () => {
    component.movies = [
      {
        "id": "13",
        "titulo": "Gente Grande",
        "urlFoto": "https://m.media-amazon.com/images/S/pv-target-images/28ba30adb15abcf10253d4c9e07575a206dfd89e48c37714b5f8603ce1575bf9.jpg",
        "dtLancamento": "2010-06-09T03:00:00.000Z",
        "descricao": "Após a morte do treinador de basquete, cinco amigos e excompanheiros se reúnem para o feriado do 4 de Julho.",
        "nota": 6,
        "urlIMDb": "https://www.imdb.com/title/tt1375670/?ref_=nv_sr_srsg_5_tt_6_nm_2_q_gente%2520",
        "genero": "Comédia"
      },
      {
        "titulo": "Donzela",
        "urlFoto": "https://wp.ufpel.edu.br/empauta/files/2024/03/Foto-2-Divulgacao-Netflix.jpg",
        "dtLancamento": "2024-05-10T03:00:00.000Z",
        "descricao": "A princesa Elodie, que acredita que vai se casar com o príncipe Henry, descobre que está sendo sacrificada a um dragão.",
        "nota": 7,
        "urlIMDb": "https://www.imdb.com/title/tt13452446/?ref_=nv_sr_srsg_3_tt_3_nm_5_q_dam",
        "genero": "Aventura",
        "id": "15"
      },
    ];

    const result = component.isFavorite('3');
    expect(result).toBe(false);
  });
});
