import { Component } from '@angular/core';
import { Tecnico } from '../tecnico';
import { TecnicoService } from 'src/app/model/services/tecnico/tecnico.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent {

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
  selectedTecnico : boolean = true;
  selectedAdmin : boolean = false;

  constructor(private serviceTecnico : TecnicoService, private notification : MatSnackBar, private router : Router, 
             private activatedRoute : ActivatedRoute){}
             
  ngOnChanges() {
  }
  ngOnInit(){
    this.tecnico.id = this.activatedRoute.snapshot.paramMap.get("id"); // get do id da url e salvar em variável do formulário
    this.findById();
  }

  delete(): void {
    this.tecnico.dataCriacao = String.apply(Date.now());

    this.tecnico.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.serviceTecnico.delete(this.tecnico.id).subscribe(response => {

      this.notification.open("Deletado", "", { duration: 3000 });
      this.router.navigate(["tecnicos"]);
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
    this.serviceTecnico.findById(this.tecnico.id).subscribe( response => {

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
          }
        }

      this.tecnico = response;
    });
  }

  formatarCPF() {
    // Remove todos os caracteres não numéricos do CPF
    let cpf = this.tecnico.cpf.replace(/\D/g, '');

    // Aplica a formatação do CPF (XXX.XXX.XXX-XX)
    if (cpf.length === 11) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      this.tecnico.cpf = cpf;
    } else {
      this.tecnico.cpf = cpf;
    }
  }
}
