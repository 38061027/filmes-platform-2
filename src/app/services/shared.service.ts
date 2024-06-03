import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  url:string = 'http://localhost:3000/filmes'

  lastId: number = 0

  constructor(private http: HttpClient) {
    this.getMovie().subscribe(movies => {
      if (movies.length > 0) {
        const lastMovie = movies[movies.length - 1];
        this.lastId = parseInt(lastMovie.id); 
      }
    });
   }


  getMovie():Observable<any[]>{
 
    return this.http.get<any[]>(this.url)
  }

  sendMovie(movie:any):Observable<any>{
    this.lastId++;
    movie.id = this.lastId.toString();
    return this.http.post<any>(this.url,movie)
  }


    editMovie(movie:any, id:string | undefined):Observable<any>{
      return this.http.put<any>(`${this.url}/${id}`, movie)
    }
  
    removeMovie(id:string){
      return this.http.delete(`${this.url}/${id}`)
    }

}
