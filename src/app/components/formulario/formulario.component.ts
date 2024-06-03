import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {

  radius!: number;
  generos: string[] = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Drama','Fantasia']
  cadastro!:FormGroup

  id!:string | undefined

  @Input() metodo: 'POST' | 'PUT' = 'POST';

  constructor(private fb: FormBuilder,
    private service: SharedService,
    private router: Router,
  ){
    this.formulario({
      titulo: '',
      urlFoto: '',
      dtLancamento: '',
      descricao: '',
      nota: null,
      urlIMDb: '',
      genero: ''
    });
    const routerState = this.router.routerState;
    const url = routerState.snapshot.url;
    this.id = url.match(/[0-9]/g)?.join('')
 
  }
  
  ngOnInit(): void {

this.service.getMovie().subscribe(res=>{
  res.forEach((el:any) =>{
    if(el.id == this.id){
      this.cadastro = this.fb.group({
        titulo: [
          el.titulo,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256),
          ],
        ],
        urlFoto: [el.urlFoto, [Validators.minLength(10)]],
        dtLancamento: [el.dtLancamento, [Validators.required]],
        descricao: [el.descricao,[Validators.required, Validators.minLength(20)]],
        nota: [
          el.nota,
          [Validators.required, Validators.min(0), Validators.max(10)],
        ],
        urlIMDb: [el.urlIMDb, [Validators.minLength(10)]],
        genero: [el.genero, [Validators.required]],
      });
    }
  })
})

  }



  formulario(filme:any):void{
    this.cadastro = this.fb.group({
      titulo: [
        filme.titulo,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao,[Validators.required, Validators.minLength(20)]],
      nota: [
        filme.nota,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.cadastro.valid) {
      if (this.id && this.id !== 'undefined') {
        this.service.editMovie(this.cadastro.value, this.id).subscribe();
      } else {
        this.service.sendMovie(this.cadastro.value).subscribe();
      }
    }
   
  }

  reiniciarForm(){
    this.cadastro.reset()
  }

 

}
