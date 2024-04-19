import { Component } from '@angular/core';
import { AuthService } from '../../authService/auth.service';

@Component({
  selector: 'app-squelette',
  templateUrl: './squelette.component.html',
  styleUrls: ['./squelette.component.css']
})
export class SqueletteComponent {
  constructor(public authService: AuthService) {}


}
