import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatNativeDateModule } from '@angular/material/core'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from './components/dialog-add-user/dialog-add-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { MatMenuModule } from '@angular/material/menu';
import DialogEditUserComponent from './components/dialog-edit-user/dialog-edit-user.component';
import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NgChartsModule } from 'ng2-charts';
import { RevenueComponent } from './components/charts/revenue/revenue.component';
import { StartedDealsComponent } from './components/charts/started-deals/started-deals.component';
import { SalesActivityComponent } from './components/charts/sales-activity/sales-activity.component';
import { DealsComponent } from './components/deals/deals.component';
import { DealsCardComponent } from './components/deals-card/deals-card.component';
import { DialogAddDealComponent } from './components/dialog-add-deal/dialog-add-deal.component';
import { MatSelectModule } from '@angular/material/select';
import { InfoComponent } from './components/info/info.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    DialogAddUserComponent,
    UserDetailComponent,
    DialogEditUserComponent,
    SignInComponent,
    MainPageComponent,
    RevenueComponent,
    StartedDealsComponent,
    SalesActivityComponent,
    DealsComponent,
    DealsCardComponent,
    DialogAddDealComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    AngularFireAuthModule,
    AngularFireModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgChartsModule,
    MatSelectModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())

  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
