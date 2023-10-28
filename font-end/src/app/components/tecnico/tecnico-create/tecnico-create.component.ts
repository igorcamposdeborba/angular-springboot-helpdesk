import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TecnicoService } from 'src/app/model/services/tecnico/tecnico.service';
import { Tecnico } from '../Tecnico';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent {
  nome: FormControl =     new FormControl(null, Validators.minLength(2));
  cpf: FormControl =      new FormControl(null, Validators.minLength(11));
  email: FormControl =    new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(6));

  formattedCpf: string = '';

  tecnico : Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: ""
  }

  constructor(private serviceTecnico : TecnicoService, private _snackBar: MatSnackBar){}

  create(): void {
    this.serviceTecnico.create(this.tecnico).subscribe(response => {
      console.log(response);
        this._snackBar.open(String.apply(response));

    }, exception => {
      this._snackBar.open(String.apply(exception.error.errors));
    })
  }

  validateFields() : boolean {
    return this.nome.valid && 
           this.cpf.valid && 
           this.email.valid && 
           this.senha.valid;
  }

  formatCpf(event: any) {
    let cpf = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (cpf.length > 3) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (cpf.length > 6) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (cpf.length > 3) {
      cpf = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }
    this.formattedCpf = cpf;
  }

  addProfile(profile : any): void {
    if(this.tecnico.perfis.includes(profile)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(profile), 1);
    } else {
      this.tecnico.perfis.push(profile);
    }

  }
  
}
