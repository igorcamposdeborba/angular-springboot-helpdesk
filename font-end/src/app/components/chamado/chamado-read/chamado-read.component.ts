import { Component } from '@angular/core';
import { Chamado } from '../chamado';
import { Cliente } from '../../cliente/cliente';
import { Tecnico } from '../../tecnico/tecnico';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ChamadoService } from 'src/app/model/services/chamado/chamado.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent {

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
              private notification : MatSnackBar, 
              private activatedRoute : ActivatedRoute){}
  
  ngOnInit() : void {
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
