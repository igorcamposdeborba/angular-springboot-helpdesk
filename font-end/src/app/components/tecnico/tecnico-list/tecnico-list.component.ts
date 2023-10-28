import { Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from '../Tecnico';
import { TecnicoService } from 'src/app/model/services/tecnico/tecnico.service';


@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css'],
})

export class TecnicoListComponent {
  ELEMENT_DATA: Tecnico[] = [];

  displayedColumns: string[] = ['id', 'name', 'cpf', 'email', 'actions'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private tecnicoService : TecnicoService){
  }

  ngOnInit() : void {
    this.findAll();
  }

  findAll(){
    this.tecnicoService.findAll().subscribe(response => {
      this.ELEMENT_DATA = response; // salvar entity do banco de dados
      this.dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA); // aplicar na table do html 
      this.dataSource.paginator = this.paginator; // aplicar paginação do table do html
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
