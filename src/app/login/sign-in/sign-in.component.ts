import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form!: FormGroup;
  isLoggingIn = false;
  isRecoveringPassword = false;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.isLoggingIn = true;

    this.authenticationService.signIn({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe({
      next: () => this.router.navigate(['dashboard']),
      error: error => {
        this.isLoggingIn = false;
        this.snackBar.open(error.message, "OK", {
          duration: 5000
        })
      }
    });
  }

  recoverPassword() {
    this.isRecoveringPassword = true;

    this.authenticationService.recoverPassword(
      this.form.value.email
    ).subscribe({
      next: () => {
        this.isRecoveringPassword = false;
        this.snackBar.open("You can recover your password in your email account.", "OK", {
          duration: 5000
        });
      },
      error: error => {
        this.isRecoveringPassword = false;
        this.snackBar.open(error.message, "OK", {
          duration: 5000
        });
      }
    })
  }

}