import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Cliente } from '../../cliente/cliente';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/model/services/cliente/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent {
  nome: FormControl =     new FormControl(null, Validators.minLength(2));
  cpf: FormControl =      new FormControl(null, Validators.minLength(11));
  email: FormControl =    new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(6));

  cliente : Cliente = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: ""
  }

  response : string = "";
  selectedCliente : boolean = true;
  selectedAdmin : boolean = false;
  selectedTecnico : boolean = false;

  constructor(private serviceCliente : ClienteService, private notification : MatSnackBar, private router : Router){}

  create(): void {
    this.cliente.dataCriacao = String.apply(Date.now());
    this.serviceCliente.create(this.cliente).subscribe(response => {

      this.notification.open("Enviado", "", { duration: 3000 });
      this.router.navigate(["clientes"]);
    }, exception => {
      if(exception.error.errors){
        exception.error.errors.forEach(element => {
          this.notification.open("Erro: " + String.apply(element.message), "", { duration: 4000 });
        });
      } else {
        this.notification.open("Erro: " + exception.error.message, "", { duration: 4000 });
      }
    })
  }

  ngOnChanges() {
    this.validateFields();
  }

  validateFields() : boolean {
    return this.nome.valid && 
           this.cpf.valid && 
           this.email.valid && 
           this.senha.valid &&
           (this.selectedAdmin || this.selectedCliente || this.selectedTecnico);
  }

  validateRoles() : boolean {
    return this.selectedCliente === false && this.selectedAdmin === false && this.selectedTecnico;
  }

  addProfile(profile : any): void {
    if (profile === 0) {
      this.selectedAdmin = !this.selectedAdmin;
    } else if (profile === 2) {
      this.selectedTecnico = !this.selectedTecnico;
    }

    if(this.cliente.perfis.includes(profile)){
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(profile), 1);

    } else {
      this.cliente.perfis.push(profile);
    }
  }

  formatarCPF() {
    // Remove todos os caracteres não numéricos do CPF
    let cpf = this.cliente.cpf.replace(/\D/g, '');

    // Aplica a formatação do CPF (XXX.XXX.XXX-XX)
    if (cpf.length === 11) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      this.cliente.cpf = cpf;
    } else {
      this.cliente.cpf = cpf;
    }
  }
}
