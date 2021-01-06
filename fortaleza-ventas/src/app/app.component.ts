import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pathUrl: string;

  constructor( public router: Router ) {

  }

  hasRoute( route1: string, route2: string): boolean {

    if( this.router.url.includes( route1 ) || this.router.url.includes( route2) ) {
      return true;
    } else {
      return false;
    }

  }


}
