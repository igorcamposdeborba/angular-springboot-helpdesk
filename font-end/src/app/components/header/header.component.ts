import { Component, SimpleChanges } from '@angular/core';
import { HeaderService } from '../../model/services/header/header.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public currentRoute : string = "";

  constructor(public titleService: HeaderService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Atualiza a variável com a rota atual
      }
    });
  }

  ngOnInit(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const pageTitle = this.titleService.getTitleFromRoute(this.router.routerState.snapshot.root);
        this.titleService.setTitle(pageTitle); // Muda a título da página no service. HTML faz um get desse título da página do service
      }
    });
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (this.currentRoute != ""){
  //     this.router.navigate([this.currentRoute]);
  //   }
  // }
}
