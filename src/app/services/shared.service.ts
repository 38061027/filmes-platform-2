import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMovies } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService{
  private moviesSubject = new BehaviorSubject<IMovies[]>([])
  public movies$ = this.moviesSubject.asObservable();
  private dataLoaded = false;
  urlMovies: string = `${environment.API}filmes`
  urlFavorites: string = `${environment.API}favorites`
  lastId: number = 0

  constructor(private http: HttpClient) {
    this.getMovies().subscribe((movies: IMovies[] | undefined) => {
      if (movies && movies.length > 0) {
        const lastMovie = movies[movies.length - 1];
        this.lastId = parseInt(lastMovie.id, 10);
      }
    });
  }


  getMovies(): Observable<IMovies[]> {
    if (!this.dataLoaded) {
      this.http.get<IMovies[]>(this.urlMovies).subscribe(data => {
        this.moviesSubject.next(data);
        this.dataLoaded = true;
      });
    }
    return this.movies$;
  }

  sendMovie(movie: IMovies): Observable<IMovies> {
    this.lastId++;
    movie.id = this.lastId.toString();
    return this.http.post<IMovies>(this.urlMovies, movie)
  }


  editMovie(movie: IMovies, id: string | undefined): Observable<IMovies> {
    return this.http.put<IMovies>(`${this.urlMovies}/${id}`, movie)
  }

  removeMovie(id: string) {
    return this.http.delete(`${this.urlMovies}/${id}`)
  }






  // Métodos dos Favoritos

  getFavorites(): Observable<IMovies[]> {
    return this.http.get<IMovies[]>(this.urlFavorites)
  }

  sendFavorite(favorite: IMovies): Observable<IMovies> {
    return this.http.post<IMovies>(this.urlFavorites, favorite)
  }

  deleteFavorite(id: string) {
    return this.http.delete(`${this.urlFavorites}/${id}`)
  }

}
