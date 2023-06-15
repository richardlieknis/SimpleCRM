import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthGuard } from './auth.guard';
import { DealsComponent } from './components/deals/deals.component';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent
  },
  {
    path: 'home',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UsersComponent },
      { path: 'user/:id', component: UserDetailComponent },
      { path: 'deals', component: DealsComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
