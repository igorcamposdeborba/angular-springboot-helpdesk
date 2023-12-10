import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Cliente } from '../cliente';
import { ClienteService } from 'src/app/model/services/cliente/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent {
  nome: FormControl =  new FormControl(null, Validators.minLength(2));
  cpf: FormControl =   new FormControl(null, Validators.minLength(11));
  email: FormControl = new FormControl(null, Validators.email);
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
  selectedTecnico : boolean = false;
  selectedAdmin : boolean = false;

  constructor(private serviceCliente : ClienteService, private notification : MatSnackBar, private router : Router, 
             private activatedRoute : ActivatedRoute){}
 
  ngOnChanges() {
    this.validateFields();
  }
  ngOnInit(){
    this.cliente.id = this.activatedRoute.snapshot.paramMap.get("id"); // get do id da url e salvar em variável do formulário
    this.findById();
  }

  update(): void {
    this.cliente.dataCriacao = String.apply(Date.now());

    this.cliente.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.serviceCliente.update(this.cliente).subscribe(response => {

      this.notification.open("Atualizado", "", { duration: 3000 });
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
  


  validateFields() : boolean {
    return this.nome.valid && 
           this.cpf.valid && 
           this.email.valid && 
           this.senha.valid &&
           (this.selectedAdmin || this.selectedTecnico);
  }

  validateRoles() : boolean {
    return this.selectedAdmin === false && this.selectedTecnico === false;
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
