import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  urlMovies:string = 'http://localhost:3000/filmes'
  urlFavorites:string = 'http://localhost:3000/favorites'

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

    return this.http.get<any[]>(this.urlMovies)
  }

  sendMovie(movie:any):Observable<any>{
    this.lastId++;
    movie.id = this.lastId.toString();
    return this.http.post<any>(this.urlMovies,movie)
  }


    editMovie(movie:any, id:string | undefined):Observable<any>{
      return this.http.put<any>(`${this.urlMovies}/${id}`, movie)
    }
  
    removeMovie(id:string){
      return this.http.delete(`${this.urlMovies}/${id}`)
    }





    getFavorites():Observable<any[]>{
      return this.http.get<any[]>(this.urlFavorites)
    }

    sendFavorite(favorite:any):Observable<any>{
      return this.http.post<any>(this.urlFavorites,favorite)
    }

    deleteFavorite(id:string){
      return this.http.delete(`${this.urlFavorites}/${id}`)
    }

}
