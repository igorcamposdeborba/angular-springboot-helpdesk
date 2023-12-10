import { Component, ViewChild } from '@angular/core';
import { Chamado } from '../chamado';
import { MatTableDataSource } from '@angular/material/table';
import { ChamadoService } from 'src/app/model/services/chamado/chamado.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent {
  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'actions'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private chamadoService : ChamadoService) {}
  
  ngOnInit() : void {
    this.findAll();
  }

  findAll() : void {
    this.chamadoService.findAll().subscribe(response => {
      console.log(response);
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  orderByStatus(status : number) : void {
    let list : Chamado[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if (element.status === status) {
        list.push(element);
      }
    })
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(this.FILTERED_DATA);
    this.dataSource.paginator = this.paginator;
  }
}
