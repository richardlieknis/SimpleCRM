import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CollectionReference, DocumentData, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  tokenName = 'token';
  form!: FormGroup;
  isLoggingIn = false;
  isRecoveringPassword = false;
  user = new User();
  private userCollection: CollectionReference<DocumentData>;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private firestore: Firestore,
  ) {
    this.userCollection = collection(this.firestore, 'users');
  }

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
      next: () => {
        localStorage.setItem(this.tokenName, 'token');
        this.router.navigate(['home/dashboard'])
      },
      error: error => {
        this.isLoggingIn = false;
        this.snackBar.open(error.message, "OK", {
          duration: 5000
        })
      }
    });
  }

  register() {
    this.authenticationService.signUp({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe({
      next: () => {
        this.snackBar.open("Account created. You can log in now.", "OK", {
          duration: 5000
        })
      },
      error: error => {
        this.snackBar.open(error.message, "OK", {
          duration: 5000
        })
      }
    })
  }

  guestLogin() {
    localStorage.setItem(this.tokenName, 'guest-token');
    this.router.navigate(['home/dashboard']);
  }

  signInWithGoogle() {
    this.authenticationService.signInWithGoogle();
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