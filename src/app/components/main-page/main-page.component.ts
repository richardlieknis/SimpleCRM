import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../login/sign-in/services/authentication.service';
import { NavigationStart, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, AfterViewInit {
  title = this.router.url.split('/')[2].toUpperCase();
  @ViewChild('drawer') drawer!: MatDrawer;
  @HostListener('window:resize', ['$event'])
    onWindowResize(event: any){
      this.updateDrawerMode(event.target.innerWidth);
    }

  constructor(
    private authService: AuthenticationService,
    public router: Router) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      this.title = event['url'].split('/')[2].toUpperCase();
    });
  }

  ngAfterViewInit(): void {
      this.updateDrawerMode(window.innerWidth);
  }

  logout() {
    this.authService.logout();
  }

  updateDrawerMode(windowWidth: number){
    if (windowWidth < 950){
      this.drawer.mode = 'over';
      this.drawer.close();
    } else this.drawer.mode = 'side';
  }
}
