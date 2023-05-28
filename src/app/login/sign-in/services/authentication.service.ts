import { Injectable } from '@angular/core';
import { GoogleAuthProvider, getAuth, signInWithPopup } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { catchError, from, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  provider = new GoogleAuthProvider();
  public tokenName: string = 'token';

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  signIn(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    )).pipe(
      catchError((error: FirebaseError) => 
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  recoverPassword(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email)).pipe(
      catchError((error: FirebaseError) => 
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  signInWithGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, this.provider)
      .then((result) => {
        this.router.navigateByUrl('home/dashboard');
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        localStorage.setItem(this.tokenName, 'token');
        console.log("TOKEN: " + token, "USER: " + user.toJSON);
    })
  }

  isLoggedIn() {
    return localStorage.getItem(this.tokenName) != null;
  }

  logout() {
    localStorage.removeItem(this.tokenName);
  }

  private translateFirebaseErrorMessage({code, message}: FirebaseError) {
    if (code === "auth/user-not-found") {
      return "User not found.";
    }
    if (code === "auth/wrong-password") {
      return "Wrong password.";
    }
    return message;
  }

}

type SignIn = {
  email: string;
  password: string;
}

type FirebaseError = {
  code: string;
  message: string
};