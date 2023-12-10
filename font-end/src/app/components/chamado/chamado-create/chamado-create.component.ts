import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Chamado } from '../chamado';
import { Cliente } from '../../cliente/cliente';
import { Tecnico } from '../../tecnico/tecnico';
import { ClienteService } from 'src/app/model/services/cliente/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TecnicoService } from 'src/app/model/services/tecnico/tecnico.service';
import { ChamadoService } from 'src/app/model/services/chamado/chamado.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent {

  titleTicket: FormControl = new FormControl(null, Validators.minLength(2));
  status: FormControl = new FormControl(null, Validators.required);
  priority: FormControl = new FormControl(null, Validators.required);
  technical: FormControl = new FormControl(null, Validators.required);
  client: FormControl = new FormControl(null, Validators.required);
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
              private router : Router){}
  
  ngOnInit() : void {
    this.findAllClientes();
    this.findAllTecnicos();
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

  create() : void {
    this.serviceChamado.create(this.chamado).subscribe(response => {
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
}
