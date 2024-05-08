import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-squelette',
  templateUrl: '../squelette/squelette.component.html',
  styleUrls: ['./squelette.component.css']
})
export class SqueletteComponent {
  constructor(private router: Router) {}


  isPathAdmin(): boolean {
    return this.router.url.startsWith('/admin');
  }

  getCurrentRoute(): string {
    return this.router.url;
  }

}
