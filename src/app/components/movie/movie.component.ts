import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit{

  id!:string | null

  movie:any

  constructor(private route: ActivatedRoute,
    private service:SharedService
  ){

    const idMovie = this.route.snapshot.paramMap.get('id');
    this.id = idMovie
    console.log(idMovie)
  }

  ngOnInit(): void {
    this.service.getMovie().subscribe((res:any)=>{

        res.forEach((el:any) => {
          if(el.id == this.id){
            this.movie = el
          }
        })
      

    })
  }
  
}
