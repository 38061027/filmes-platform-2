import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit{
  animal!: string;
  name!: string;

  id!:string | null

  movie:any

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service:SharedService,
    public dialog: MatDialog
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



  openDialog(): void {
    const dialogRef = this.dialog.open(FormularioComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  removeMovie(id:string){
    this.service.removeMovie(id).subscribe(()=>{
      this.router.navigateByUrl('')
    })
  }
  
}
