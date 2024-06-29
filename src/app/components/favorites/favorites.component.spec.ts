import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { FooterComponent } from '../footer/footer.component';
import { SharedService } from 'src/app/services/shared.service';
import { of } from 'rxjs';
import { IMovies } from 'src/app/interfaces/interface';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let httpMock: HttpTestingController
  let service: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FavoritesComponent, FooterComponent]
    })
      .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SharedService);
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve excluir favoritos', () => {
    const deleteSpy = spyOn(service, 'deleteFavorite').and.returnValue(of({}));


    const id = '1';
    component.deleteFavorite(id);

    expect(deleteSpy).toHaveBeenCalledWith(id);
  })

  it('Deve retornar a lista dos favoritos', () => {
    const mockFavorites: IMovies[] = [
      {
        id: '13',
        titulo: 'Gente Grande',
        urlFoto: 'https://m.media-amazon.com/images/S/pv-target-images/28ba30adb15abcf10253d4c9e07575a206dfd89e48c37714b5f8603ce1575bf9.jpg',
        dtLancamento: '2010-06-09T03:00:00.000Z',
        descricao: 'Após a morte do treinador de basquete, cinco amigos e excompanheiros se reúnem para o feriado do 4 de Julho.',
        nota: 6,
        urlIMDb: 'https://www.imdb.com/title/tt1375670/?ref_=nv_sr_srsg_5_tt_6_nm_2_q_gente%2520',
        genero: 'Comédia',
      },
    ];


    spyOn(service, 'getFavorites').and.returnValue(of(mockFavorites));
    component.getFavorites();
    expect(component.favoritesMovies).toEqual(mockFavorites);
  });
});
