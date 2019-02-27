import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  // loginUser
  loginUser(email: string, password: string):
    Promise<firebase.auth.UserCredential> {
    return firebase.auth()
      .signInWithEmailAndPassword(email, password);
  }

  // signupUser
  signupUser(email: string, password: string): Promise<void> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredential.user.uid}`)
          .set({ email });
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  }

  // logoutUser
  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  // resetPassword
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

}
