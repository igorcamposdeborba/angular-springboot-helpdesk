import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private router : Router, private titleService: Title) {
  }

  ngOnInit() : void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        const pageTitle = this.getTitleFromRoute(this.router.routerState.snapshot.root);
        this.titleService.setTitle(pageTitle);
      }
    });

    //this.router.navigate([this.currentRoute]);
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

  
}
