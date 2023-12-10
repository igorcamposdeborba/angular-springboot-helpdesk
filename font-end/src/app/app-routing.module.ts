import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';

const routes: Routes = [
  {
    path: "",
    component: NavComponent, children: [
      {
        path: "",
        pathMatch: "full",
        data: { title: "Página inicial" },
        component: HomeComponent
      },
      {
        path: "home",
        data: { title: "Página inicial" },
        component: HomeComponent
      },

      {
        path: "tecnicos",
        data: { title: "Técnicos" },
        component: TecnicoListComponent
      },
      {
        path: "tecnicos/create",
        data: { title: "Técnicos" },
        component: TecnicoCreateComponent
      },
      {
        path: "tecnicos/update/:id",
        data: { title: "Técnicos" },
        component: TecnicoUpdateComponent
      },
      {
        path: "tecnicos/delete/:id",
        data: { title: "Técnicos" },
        component: TecnicoDeleteComponent
      },

      {
        path: "clientes",
        data: { title: "Clientes" },
        component: ClienteListComponent
      },
      {
        path: "clientes/create",
        data: { title: "Clientes" },
        component: ClienteCreateComponent
      },
      {
        path: "clientes/update/:id",
        data: { title: "Clientes" },
        component: ClienteUpdateComponent
      },
      {
        path: "clientes/delete/:id",
        data: { title: "Clientes" },
        component: ClienteDeleteComponent
      },

      {
        path: "chamados",
        data: { title: "Chamados" },
        component: ChamadoListComponent
      },
      {
        path: "chamados/create",
        data: { title: "Chamados" },
        component: ChamadoCreateComponent
      },
      {
        path: "chamados/update/:id",
        data: { title: "Chamados" },
        component: ChamadoUpdateComponent
      },
      {
        path: "chamados/read/:id",
        data: { title: "Chamados" },
        component: ChamadoReadComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
