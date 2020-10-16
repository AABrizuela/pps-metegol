import { Injectable } from '@angular/core';
import {storage} from 'firebase'
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  uploadImage(foto, path){
    const subirString = storage().ref(`metegol/${path}`)
      subirString.putString(foto, 'data_url');
  }

  

  crearDoc(nombre:string){
    this.firestore.collection('jugadores').doc(nombre).set(
      {
        nombre: nombre,
        ganados: 0
      }
    )
  }


  update(jugador){
    this.firestore.collection('jugadores').doc(jugador.nombre).update(jugador)
  }

}
