import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit{

  favoritesMovies!:any[]


  constructor(private service: SharedService){}


  ngOnInit(): void {
    this.getFavorites()
  }


  deleteFavorite(id:string){
    this.service.deleteFavorite(id).subscribe(()=>{
      this.getFavorites()
    })
  }

  getFavorites(){
    this.service.getFavorites().subscribe(res => this.favoritesMovies = res)
  }

}
