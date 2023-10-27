import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Tecnico } from '../Tecnico';
import { TecnicoService } from 'src/app/model/services/tecnico/tecnico.service';


@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css'],
})

export class TecnicoListComponent implements AfterViewInit {
  ELEMENT_DATA: Tecnico[] = [];
  /*ELEMENT_DATA: Tecnico[] = [
    {
      id: 1,
      name: "Igor Borba",
      cpf: "123456789-10",
      email: "igor@hotmail.com",
      password: "123456",
      perfils: ["0"],
      createdDate: "26/10/2023"
    }
  ];*/

  displayedColumns: string[] = ['id', 'name', 'cpf', 'email', 'actions'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tecnicoService : TecnicoService){
  }

  ngOnInit() : void {
    this.findAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  findAll(){
    this.tecnicoService.findAll().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
    });
  }
}
