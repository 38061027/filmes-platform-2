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
  genre: string[] = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Drama', 'Fantasia', 'Animação']
  register!: FormGroup
  id!: string | undefined
  spinner: boolean = false



  constructor(private fb: FormBuilder,
    private service: SharedService,
    private router: Router,
  ) {
    this.inicializarFormulario()
    const routerState = this.router.routerState;
    const url = routerState.snapshot.url;
    this.id = url.match(/[0-9]/g)?.join('')

  }

  ngOnInit(): void {

    if (this.id) {
      this.service.getMovies().subscribe(res => {
        const filme = res.find((el: any) => el.id == this.id);
        if (filme) {
          this.preencherFormulario(filme);
        }
      });
    }

  }

  inicializarFormulario(): void {
    this.register = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.minLength(20)]],
      nota: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });
  }

  preencherFormulario(filme: any): void {
    this.register.setValue({
      titulo: filme.titulo,
      urlFoto: filme.urlFoto,
      dtLancamento: filme.dtLancamento,
      descricao: filme.descricao,
      nota: filme.nota,
      urlIMDb: filme.urlIMDb,
      genero: filme.genero
    });
  }

  onSubmit(): void {
    if (this.isValidForm()) {
      if (this.id && this.id !== 'undefined') {
        this.spinner = true
        setTimeout(() => this.spinner = false, 1200)
        this.service.editMovie(this.register.value, this.id).subscribe();
      } else {
        this.router.navigateByUrl('')
        this.service.sendMovie(this.register.value).subscribe();
      }
    }

  }

  reiniciarForm() {
    this.register.reset()
  }

  isValidForm():boolean{
    return this.register.valid
  }


}
