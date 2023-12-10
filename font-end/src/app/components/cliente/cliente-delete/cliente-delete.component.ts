import { Component } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from 'src/app/model/services/cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent {
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
  selectedTecnico : boolean = true;
  selectedAdmin : boolean = false;

  constructor(private serviceCliente : ClienteService, private notification : MatSnackBar, private router : Router, 
             private activatedRoute : ActivatedRoute){}
             
  ngOnChanges() {
  }
  ngOnInit(){
    this.cliente.id = this.activatedRoute.snapshot.paramMap.get("id"); // get do id da url e salvar em variável do formulário
    this.findById();
  }

  delete(): void {
    this.cliente.dataCriacao = String.apply(Date.now());

    this.cliente.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.serviceCliente.delete(this.cliente.id).subscribe(response => {

      this.notification.open("Deletado", "", { duration: 3000 });
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

  findById(): void {    
    this.serviceCliente.findById(this.cliente.id).subscribe( response => {

      console.log(response);
        for (let i=0; i<response.perfis.length; i++){
          if (response.perfis[i] == "CLIENTE") { // Converter para número porque back-end coloca como padrão no enum o nome do enum
            response.perfis[i] = 1;
          }
          if (response.perfis[i] == "ADMIN") {
            response.perfis[i] = 0;
            this.selectedAdmin = true; // atualizar front-end em relação ao back-end
          }
          if (response.perfis[i] == "TECNICO") {
            response.perfis[i] = 2;
            this.selectedTecnico = true; // atualizar front-end em relação ao back-end
          }
        }

      this.cliente = response;
    });
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
