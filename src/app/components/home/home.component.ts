import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { IMovies } from 'src/app/interfaces/interface';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChildren('btnFavorite') btnFavorites!: QueryList<ElementRef>;
  @ViewChild('notification') msgNotification!: ElementRef;
  @ViewChild('ckeck') ckeck!: ElementRef;

  favoriteIds: string[] = [];
  movies: IMovies[] = [];
  genres: string[] = [
    'Ação',
    'Romance',
    'Aventura',
    'Terror',
    'Ficção cientifica',
    'Comédia',
    'Drama',
    'Fantasia',
    'Animação',
  ];
  filterList!: FormGroup;
  counter: number = 0;
  filteredOptions!: Observable<string[]>;
  btn: boolean = false;
  movieName: string = '';

  constructor(
    private service: SharedService,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) {
    this.filterList = this.fb.group({
      texto: [''],
      genero: [''],
    });
  }

  isFavorite(id: string): boolean {
    return this.movies.some((favorite) => favorite.id === id);
  }

  ngOnInit(): void {
    this.getMovie();
    this.filterMovie();
    this.loadFavorites();
    this.filteredOptions = this.filterList.get('texto')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.movies
      .map((movie) => movie.titulo)
      .filter((titulo) => titulo.toLowerCase().includes(filterValue));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateFavoriteButtonColors();
    }, 200);
  }

  updateFavoriteButtonColors() {
    if (this.btnFavorites) {
      this.btnFavorites.forEach((btn: any) => {
        const buttonElement = btn.nativeElement;
        const favoriteId = buttonElement.getAttribute('data-id');
        if (this.favoriteIds.includes(favoriteId)) {
          this.renderer.setStyle(buttonElement, 'color', 'red');
          return;
        }
        this.renderer.setStyle(buttonElement, 'color', 'white');
      });
    }
  }

  loadFavorites() {
    this.service.getFavorites().subscribe((res: IMovies[]) => {
      this.counter = res.length;
      this.favoriteIds = res.map((fav) => fav.id);
      this.updateFavoriteButtonColors();
    });
  }

  getMovie() {
    this.service.getMovies().subscribe((res: IMovies[]) => {
      this.movies = res;
    });
  }

  filterMovie() {
    this.filterList.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((values) => {
        this.service.getMovies().subscribe((res: IMovies[]) => {
          let filteredMovies: IMovies[] = res;
          if (values.texto !== '') {
            filteredMovies = filteredMovies.filter((movie) =>
              movie.titulo.toLowerCase().startsWith(values.texto.toLowerCase())
            );
          }
          if (values.genero !== '') {
            filteredMovies = filteredMovies.filter(
              (movie) => movie.genero === values.genero
            );
          }
          this.movies = filteredMovies;
          this.loadFavorites();
        });
      });
  }

  sendFavorites(favorite: IMovies, event: Event) {
    this.service.getFavorites().subscribe((favorites: IMovies[]) => {
      const isFavorite = favorites.some((fav: any) => fav.id === favorite.id);
      const clickedButton = event.target as HTMLElement;
      if (!isFavorite) {
        this.service.sendFavorite(favorite).subscribe(() => {
          this.msgNotification.nativeElement.innerText = `Você adicionou o filme ${favorite.titulo} aos favoritos!!`;
          this.ckeck.nativeElement.innerText = 'check';
          this.favoriteIds.push(favorite.id);
          this.updateFavoriteButtonColors();
          this.counter++;
        });
      } else {
        clickedButton.innerHTML = 'heart_broken';
        clickedButton.classList.add('scale-effect');
        this.service.deleteFavorite(favorite.id).subscribe(() => {
          this.msgNotification.nativeElement.innerText = `Você removeu o filme ${favorite.titulo} dos favoritos!!`;
          this.ckeck.nativeElement.innerText = 'close';
          this.renderer.setStyle(this.ckeck.nativeElement, 'color', 'red');

          setTimeout(() => {
            clickedButton.classList.remove('scale-effect');
            clickedButton.innerHTML = 'favorite';
          }, 1000);
          this.favoriteIds = this.favoriteIds.filter(
            (id) => id !== favorite.id
          );
          this.updateFavoriteButtonColors();
          this.counter--;
        });
      }
    });
  }

  msg(click: boolean) {
    if (click) {
      this.btn = true;
      setTimeout(() => {
        this.btn = false;
      }, 2500);
    }
  }
}
