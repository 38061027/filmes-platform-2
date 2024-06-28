import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { environment } from 'src/environments/environment';
describe('SharedService', () => {
  let service: SharedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve excluir filme', () => {
    const id = '2'
    service.removeMovie(id).subscribe(res =>{
      expect(res).toBe({})
    })

    const request = httpMock.expectOne(`${environment.API}filmes/${id}`)
    expect(request.request.method).toBe('DELETE')
    expect(request.request.url).toBe(`${environment.API}filmes/${id}`)
    
  })
});
