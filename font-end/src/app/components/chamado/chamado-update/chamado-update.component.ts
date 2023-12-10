import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Chamado } from '../chamado';
import { Cliente } from '../../cliente/cliente';
import { Tecnico } from '../../tecnico/tecnico';
import { ClienteService } from 'src/app/model/services/cliente/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TecnicoService } from 'src/app/model/services/tecnico/tecnico.service';
import { ChamadoService } from 'src/app/model/services/chamado/chamado.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent {

  titleTicket: FormControl = new FormControl(null, Validators.minLength(2));
  status: FormControl = new FormControl(0, Validators.required);
  priority: FormControl = new FormControl(0, Validators.required);
  technical: FormControl = new FormControl(0, Validators.required);
  client: FormControl = new FormControl(0, Validators.required);
  description: FormControl = new FormControl(null, Validators.minLength(2));

  clientesList : Cliente[] = [];
  tecnicosList : Tecnico[] = [];

  chamado : Chamado = {
    dataAbertura: "",
    dataFechamento: "",
    prioridade: -1,
    status: -1,
    titulo: "",
    observacoes: "",
    tecnico: -1,
    cliente: -1,
    nomeTecnico: "",
    nomeCliente: ""
  }

  constructor(private serviceChamado : ChamadoService,
              private serviceCliente : ClienteService,
              private serviceTecnico : TecnicoService, 
              private notification : MatSnackBar, 
              private router : Router,
              private activatedRoute : ActivatedRoute){}
  
  ngOnInit() : void {
    this.findAllClientes();
    this.findAllTecnicos();
    this.chamado.id = this.activatedRoute.snapshot.paramMap.get("id"); // get do id da url e salvar em variável do formulário
    this.findById();
  }

  findById() : void {
    this.serviceChamado.findById(this.chamado.id).subscribe(response => {
      this.chamado = response;
    
    }, exception => {
      if(exception.error.errors){
        exception.error.errors.forEach(element => {
          this.notification.open("Erro: " + String.apply(element.message), "", { duration: 4000 });
        });
      } else {
        this.notification.open("Erro: " + exception.error.message, "", { duration: 4000 });
      }
    });
  }
  
  findAllClientes() : void {
    this.serviceCliente.findAll().subscribe(response => {
      this.clientesList = response;
    });
  }

  findAllTecnicos() : void {
    this.serviceTecnico.findAll().subscribe(response => {
      this.tecnicosList = response;
    });
  }

  update() : void {
    this.serviceChamado.update(this.chamado).subscribe(response => {
      this.notification.open("Enviado", "", { duration: 3000 });
      this.router.navigate(["chamados"]);

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

  validateFields() : boolean {
    return this.titleTicket.valid && 
           this.status.valid && 
           this.priority.valid && 
           this.technical.valid &&
           this.client.valid &&
           this.description.valid;
  }

  formatStatus(status : number) : string {
    if (status === 0) {
      return "ABERTO";
    }
    else if (status === 1) {
      return "EM ANDAMENTO";
    }
    else {
      return "ENCERRADO";
    }
  }

  formatPriority(priority : number) : string {
    if (priority === 0) {
      return "BAIXA";
    }
    else if (priority === 1) {
      return "MÉDIA";
    }
    else {
      return "ALTA";
    }
  }

}
