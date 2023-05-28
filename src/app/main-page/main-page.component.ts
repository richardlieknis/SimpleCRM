import { Component } from '@angular/core';
import { AuthenticationService } from '../login/sign-in/services/authentication.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  constructor(private authService: AuthenticationService) {  }

  logout() {
    this.authService.logout();
  }
}
