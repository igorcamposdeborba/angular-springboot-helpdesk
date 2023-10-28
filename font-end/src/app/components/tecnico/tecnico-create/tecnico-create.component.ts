import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TecnicoService } from 'src/app/model/services/tecnico/tecnico.service';
import { Tecnico } from '../Tecnico';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  response : string = "";

  constructor(private serviceTecnico : TecnicoService, private notification : MatSnackBar, private router : Router){}

  create(): void {
    this.tecnico.dataCriacao = String.apply(Date.now());
    this.serviceTecnico.create(this.tecnico).subscribe(response => {
      console.log(response);
      this.notification.open("Enviado", "", { duration: 3000 });
      this.router.navigate(["tecnicos"]);
    }, exception => {
      if(exception.error.errors){
        exception.error.errors.forEach(element => {
          this.notification.open("Erro" + String.apply(element.message), "", { duration: 4000 });
        });
      } else {
        this.notification.open("Erro: " + exception.error.message, "", { duration: 4000 });
      }
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
