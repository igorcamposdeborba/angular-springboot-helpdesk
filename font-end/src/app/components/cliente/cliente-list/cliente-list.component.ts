import { Component, ViewChild } from '@angular/core';
import { Cliente } from '../cliente';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/app/model/services/cliente/cliente.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent {
  ELEMENT_DATA: Cliente[] = [];

  displayedColumns: string[] = ['id', 'name', 'cpf', 'email', 'actions'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private tecnicoService : ClienteService){
  }

  ngOnInit() : void {
    this.findAll();
  }

  findAll(){
    this.tecnicoService.findAll().subscribe(response => {
      this.ELEMENT_DATA = response; // salvar entity do banco de dados
      this.dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA); // aplicar na table do html 
      this.dataSource.paginator = this.paginator; // aplicar paginação do table do html
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
