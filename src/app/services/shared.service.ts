import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  url:string = 'http://localhost:3000/filmes'

  constructor(private http: HttpClient) { }


  getMovie():Observable<any[]>{
    return this.http.get<any[]>(this.url)
  }


}
