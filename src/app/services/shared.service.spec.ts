import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { IMovies } from '../interfaces/interface';

class myServiceMock extends SharedService {

  response = [{
    "titulo": "MIB: Homens de Preto - Internacional",
    "urlFoto": "https://m.media-amazon.com/images/M/MV5BMDZkODI2ZGItYTY5Yi00MTA4LWExY2ItM2ZmNjczYjM0NDg1XkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "dtLancamento": "2024-06-18T03:00:00.000Z",
    "descricao": "The Men in Black have always protected the Earth from the scum of the universe. In this new adventure, they tackle their biggest threat to date: a mole in the Men in Black organization.",
    "nota": 5.7,
    "urlIMDb": "https://www.imdb.com/title/tt2283336/",
    "genero": "Ação",
    "id": "4"
  }]

  override getMovies() {
    return of(this.response)
  }
}

describe('SharedService', () => {
  let service: SharedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: SharedService,
          useClass: myServiceMock
        }
      ]
    });
    service = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve excluir filme', () => {
    const id = '2'
    service.removeMovie(id).subscribe(res => {
      expect(res).toBe({})
    })

    const request = httpMock.expectOne(`${environment.API}filmes/${id}`)
    expect(request.request.method).toBe('DELETE')
    expect(request.request.url).toBe(`${environment.API}filmes/${id}`)

  })

  it('Deve realizar chamada HTTP', () => {

    const response = [{
      "titulo": "MIB: Homens de Preto - Internacional",
      "urlFoto": "https://m.media-amazon.com/images/M/MV5BMDZkODI2ZGItYTY5Yi00MTA4LWExY2ItM2ZmNjczYjM0NDg1XkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_UX182_CR0,0,182,268_AL_.jpg",
      "dtLancamento": "2024-06-18T03:00:00.000Z",
      "descricao": "The Men in Black have always protected the Earth from the scum of the universe. In this new adventure, they tackle their biggest threat to date: a mole in the Men in Black organization.",
      "nota": 5.7,
      "urlIMDb": "https://www.imdb.com/title/tt2283336/",
      "genero": "Ação",
      "id": "4"
    }]

    service.getMovies().subscribe(res => {
      expect(res).toEqual(response)
    })
  })

  it('Deve fazer requisição POST para filmes', () => {
    const movie = {
      "titulo": "MIB: Homens de Preto - Internacional",
      "urlFoto": "https://m.media-amazon.com/images/M/MV5BMDZkODI2ZGItYTY5Yi00MTA4LWExY2ItM2ZmNjczYjM0NDg1XkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_UX182_CR0,0,182,268_AL_.jpg",
      "dtLancamento": "2024-06-18T03:00:00.000Z",
      "descricao": "The Men in Black have always protected the Earth from the scum of the universe. In this new adventure, they tackle their biggest threat to date: a mole in the Men in Black organization.",
      "nota": 5.7,
      "urlIMDb": "https://www.imdb.com/title/tt2283336/",
      "genero": "Ação",
      "id": "4"
    }

    service.sendMovie(movie).subscribe(res => {
      expect(res).toBe(movie)
    })

    const req = httpMock.expectOne(service.urlMovies);
    expect(req.request.method).toBe('POST');
    req.flush(movie);
  })

  it('Deve fazer requisição PUT', () => {
    const id = '1'
    const movie = {
      "id": "13",
      "titulo": "Gente Grande",
      "urlFoto": "https://m.media-amazon.com/images/S/pv-target-images/28ba30adb15abcf10253d4c9e07575a206dfd89e48c37714b5f8603ce1575bf9.jpg",
      "dtLancamento": "2010-06-09T03:00:00.000Z",
      "descricao": "Após a morte do treinador de basquete, cinco amigos e excompanheiros se reúnem para o feriado do 4 de Julho.",
      "nota": 6,
      "urlIMDb": "https://www.imdb.com/title/tt1375670/?ref_=nv_sr_srsg_5_tt_6_nm_2_q_gente%2520",
      "genero": "Comédia"
    }

    const response = {
      "titulo": "Donzela",
      "urlFoto": "https://wp.ufpel.edu.br/empauta/files/2024/03/Foto-2-Divulgacao-Netflix.jpg",
      "dtLancamento": "2024-05-10T03:00:00.000Z",
      "descricao": "A princesa Elodie, que acredita que vai se casar com o príncipe Henry, descobre que está sendo sacrificada a um dragão.",
      "nota": 7,
      "urlIMDb": "https://www.imdb.com/title/tt13452446/?ref_=nv_sr_srsg_3_tt_3_nm_5_q_dam",
      "genero": "Aventura",
      "id": "15"
    }

    service.editMovie(movie, id).subscribe(res => {
      expect(res).toBe(response)
    })
    const req = httpMock.expectOne(`${service.urlMovies}/${id}`)
    expect(req.request.method).toBe('PUT')
  })


  it('Deve fazer uma requisição POST para filmes favoritos', () =>{
    const response = {
      "id": "17",
      "titulo": "Carros",
      "urlFoto": "https://play-lh.googleusercontent.com/kHt8qbche40zkE6yZwA8IUe5ARINp4PjrJ5mi622GEzQFYWCaGTQDAl58rrRKRKyhnD2=w240-h480-rw",
      "dtLancamento": "2006-06-14T03:00:00.000Z",
      "descricao": "Um carro de corridas chamado Relâmpago McQueen é desviado para Radiator Springs, onde ele encontra o verdadeiro significado da amizade e da família.",
      "nota": 7.2,
      "urlIMDb": "https://www.imdb.com/title/tt0317219/?ref_=nv_sr_srsg_0_tt_8_nm_0_in_0_q_carros",
      "genero": "Animação"
    }


    const favorite = {
      "titulo": "Donzela",
      "urlFoto": "https://wp.ufpel.edu.br/empauta/files/2024/03/Foto-2-Divulgacao-Netflix.jpg",
      "dtLancamento": "2024-05-10T03:00:00.000Z",
      "descricao": "A princesa Elodie, que acredita que vai se casar com o príncipe Henry, descobre que está sendo sacrificada a um dragão.",
      "nota": 7,
      "urlIMDb": "https://www.imdb.com/title/tt13452446/?ref_=nv_sr_srsg_3_tt_3_nm_5_q_dam",
      "genero": "Aventura",
      "id": "15"
    }

    const id = '2'

    service.sendFavorite(favorite).subscribe(res => {
      expect(res).toBe(favorite)
    })

    const req = httpMock.expectOne(`${service.urlFavorites}`)
    expect(req.request.method).toBe('POST')

 
  })

  it('Deve excluir um filme favorito', () => {
    const id = '2'
    service.deleteFavorite(id).subscribe(res => {
      expect(res).toBe({})
    })

    const request = httpMock.expectOne(`${environment.API}favorites/${id}`)
    expect(request.request.method).toBe('DELETE')
    expect(request.request.url).toBe(`${environment.API}favorites/${id}`)

  })

  

});
