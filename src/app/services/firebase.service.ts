import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  /* Autenticacion */

  /* Acceder */
  singIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  /* Registro */
  singUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  /* Update */
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }


  /* DB */
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }
}
