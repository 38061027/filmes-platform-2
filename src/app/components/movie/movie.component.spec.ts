import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';



describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let routerMock: any;
  let movieServiceMock: any;

  beforeEach(async () => {
    movieServiceMock = {
      removeMovie: jasmine.createSpy('removeMovie').and.returnValue(of({})),
      deleteFavorite: jasmine.createSpy('deleteFavorite').and.returnValue(of({}))
    };

    routerMock = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule],
      declarations: [MovieComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        { provide: SharedService, useValue: movieServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  


});
