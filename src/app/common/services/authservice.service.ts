import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('notTrelloUser', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('notTrelloUser')!);
      } else {
        localStorage.removeItem('notTrelloUser');
        // localStorage.setItem('notTrelloUser', 'null');
        // JSON.parse(localStorage.getItem('notTrelloUser')!);
      }
    });
  }

  isAuthorized(): boolean {
    return !!JSON.parse(localStorage.getItem('notTrelloUser')!);
  }


  // log in with email/password
  logIn(email: string, password: string) {
    console.log('logIn');

    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['board']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  signUp(email: string, password: string) {
    console.log('signUp');
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(result.user);
        this.router.navigate(['board']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  private SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
    // .then(() => {
    //   this.router.navigate(['verify-email']);
    // });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('notTrelloUser')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
  //     if (res) {
  //       this.router.navigate(['main']);
  //     }
  //   });
  // }
  // Auth logic to run auth providers
  private AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['main']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: ''
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('notTrelloUser');
      this.router.navigate(['signin']);
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('notTrelloUser')!)
  }

}
