import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent
  },
  {
    path: 'home',
    component: MainPageComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent,},
      { path: 'user', component: UsersComponent,},
      { path: 'user/:id', component: UserDetailComponent,},
      { path: 'signin', component: SignInComponent},
      { path: 'register-user', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent, },
      { path: 'verify-email-address', component: VerifyEmailComponent, },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
