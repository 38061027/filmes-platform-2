import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { FooterComponent } from '../footer/footer.component';
import { SharedService } from 'src/app/services/shared.service';
import { of } from 'rxjs';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let httpMock: HttpTestingController
  let service: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ FavoritesComponent, FooterComponent ]
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

  it('Deve excluir favoritos e retornar favoritos', () =>{
    const deleteSpy = spyOn(service, 'deleteFavorite').and.returnValue(of({}));
    const getFavoritesSpy = spyOn(component, 'getFavorites').and.callThrough();

    const id = '1';
    component.deleteFavorite(id);

    expect(deleteSpy).toHaveBeenCalledWith(id);
    expect(getFavoritesSpy).toHaveBeenCalled();
  })
});
