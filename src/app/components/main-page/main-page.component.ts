import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/sign-in/services/authentication.service';
import { NavigationStart, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  test = this.router.url.split('/')[2].toUpperCase();

  constructor(
    private authService: AuthenticationService,
    public router: Router) {  
    }

    ngOnInit(): void {
      this.router.events.pipe(
        filter((event) => event instanceof NavigationStart)
      ).subscribe((event: any) => {
        this.test = event['url'].split('/')[2].toUpperCase();
      });
    }

  logout() {
    this.authService.logout();
  }
}
