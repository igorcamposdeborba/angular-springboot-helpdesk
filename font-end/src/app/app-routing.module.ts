import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
