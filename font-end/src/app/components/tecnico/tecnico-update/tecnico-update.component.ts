import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TecnicoService } from 'src/app/model/services/tecnico/tecnico.service';
import { Tecnico } from '../Tecnico';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent {
  nome: FormControl =     new FormControl(null, Validators.minLength(2));
  cpf: FormControl =      new FormControl(null, Validators.minLength(11));
  email: FormControl =    new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(6));

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
    this.validateFields();
  }
  ngOnInit(){
    this.tecnico.id = this.activatedRoute.snapshot.paramMap.get("id"); // get do id da url e salvar em variável do formulário
    this.findById();
  }

  update(): void {
    this.tecnico.dataCriacao = String.apply(Date.now());

    this.tecnico.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.serviceTecnico.update(this.tecnico).subscribe(response => {

      this.notification.open("Atualizado", "", { duration: 3000 });
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
  


  validateFields() : boolean {
    return this.nome.valid && 
           this.cpf.valid && 
           this.email.valid && 
           this.senha.valid &&
           (this.selectedAdmin || this.selectedTecnico);
  }

  validateRoles() : boolean {
    return this.selectedTecnico === false && this.selectedAdmin === false;
  }

  addProfile(profile : any): void {
    if (profile === 0) {
      this.selectedAdmin = !this.selectedAdmin;
    } else if (profile === 2) {
      this.selectedTecnico = !this.selectedTecnico;
    }

    if(this.tecnico.perfis.includes(profile)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(profile), 1);

    } else {
      this.tecnico.perfis.push(profile);
    }
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
