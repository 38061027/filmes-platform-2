import { Component, OnInit } from '@angular/core';
import { IMovies } from 'src/app/interfaces/interface';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favoriteMovies!: IMovies[];

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  deleteFavorite(id: string) {
    this.service.deleteFavorite(id).subscribe(() => {
      this.getFavorites();
    });
  }

  getFavorites() {
    this.service
      .getFavorites()
      .subscribe((res: IMovies[]) => (this.favoriteMovies = res));
  }
}
