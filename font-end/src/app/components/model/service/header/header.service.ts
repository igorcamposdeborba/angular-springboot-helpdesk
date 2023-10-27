import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { NavComponent } from 'src/app/components/nav/nav.component';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private pageTitle : string = "Help Desk";
  constructor(private router: Router) {
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const pageTitle = this.getTitleFromRoute(this.router.routerState.snapshot.root);
        this.setTitle(pageTitle); // Muda a título da página no service
      }
    });
  }

  public getTitleFromRoute (route : ActivatedRouteSnapshot) : string {
    let pageTitle = "";
    while (route.firstChild) {
      route = route.firstChild;
      const routeData = route.data;
      if (routeData && route.data["title"]) {
        pageTitle = route.data["title"];
      }
    }
    return pageTitle;
  }

  getTitle(): string {
    return this.pageTitle;
  }

  setTitle(title : string): void{
    this.pageTitle = title;
  }
}
