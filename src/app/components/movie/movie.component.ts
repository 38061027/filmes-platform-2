import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

import { FormularioComponent } from '../formulario/formulario.component';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  id!: string | null
  spinner: boolean = false
  movie: any

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: SharedService,
    public dialog: MatDialog
  ) {

    const idMovie = this.route.snapshot.paramMap.get('id');
    this.id = idMovie
    console.log(idMovie)
  }

  ngOnInit(): void {
    this.service.getMovie().subscribe((res: any) => {
      res.forEach((el: any) => {
        if (el.id == this.id) {
          this.movie = el
        }
      })
    })

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(FormularioComponent)

    dialogRef.afterClosed().subscribe(() => {
      this.service.getMovie().pipe(
        map((movies: any[]) => movies.find(movie => movie.id === this.id))
      ).subscribe(res => this.movie = res);
    });
  }

  removeMovie(id: string) {
    let confirm = window.confirm("Você tem certeza que deseja excluir?")
  if(confirm){
    this.service.removeMovie(id).subscribe(() => {
      this.spinner = true
      setTimeout(() =>
        this.router.navigateByUrl('')
        , 1200)
    })
  }
  }

}
