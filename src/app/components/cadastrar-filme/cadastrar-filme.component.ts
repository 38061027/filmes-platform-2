import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-cadastrar-filme',
  templateUrl: './cadastrar-filme.component.html',
  styleUrls: ['./cadastrar-filme.component.scss']
})
export class CadastrarFilmeComponent implements OnInit{
  radius!: number;

  cadastro!:FormGroup

  constructor(private fb: FormBuilder){
    this.formulario({
      titulo: '',
      urlFoto: '',
      dtLancamento: '',
      descricao: '',
      nota: null,
      urlIMDb: '',
      genero: ''
    });

  }

  ngOnInit(): void {
   
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
      console.log('Formulário válido e preenchido:', this.cadastro.value);
    } else {
      console.log('Formulário inválido.');
    }
  }

}
