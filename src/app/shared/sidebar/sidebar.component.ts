import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  isSidebarExpanded: boolean = true;

  constructor(private elementRef: ElementRef, private router:Router) {}

  ngAfterViewInit(): void {
    const hamBurger = this.elementRef.nativeElement.querySelector('.toggle-btn');

    hamBurger.addEventListener('click', () => {
      const sidebar = this.elementRef.nativeElement.querySelector('#sidebar');
      sidebar.classList.toggle('expand');
    });
  }


  logout(): void {
    sessionStorage.clear();

    localStorage.clear();

    this.router.navigate(['/login']);
  }
}