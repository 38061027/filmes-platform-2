import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies!: any[]

  generos: string[] = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Drama']

  filtrosListagem!: FormGroup

  constructor(private service: SharedService,
    private fb: FormBuilder
  ) {

    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    })
  }


  ngOnInit(): void {
    this.getMovie()
    this.filterMovie()
  }



  getMovie() {
    this.service.getMovie().subscribe((res: any[]) => {
      this.movies = res;
      this.filterMovie();
    });
  }


  filterMovie() {
    this.filtrosListagem.valueChanges.subscribe(values => {
      this.service.getMovie().subscribe(res => {
        if(values.texto !== ''){
          this.movies = res.filter(movie => movie.titulo.toLowerCase().startsWith(values.texto.toLowerCase()))
        }
        if(values.genero !== ''){

          this.movies = res.filter(movie => movie.genero === values.genero);
        }
      });
      console.log(values)
    });
  }


}
