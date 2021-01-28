import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';

import { map } from 'rxjs/operators';

import { Color } from '../models/color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  private colorsCollection: AngularFirestoreCollection<Color>;

  private colors: Color[] = [];


  constructor( private afs: AngularFirestore ) {
                 
   }

   getColors() {

    this.colorsCollection = this.afs.collection( 'colors', ref => ref.orderBy( 'createdDate', 'desc'));

    return this.colorsCollection.valueChanges()
                  .pipe(
                    map( resp => {
                      this.colors = resp;
                      return this.colors;
                    }));

   }

   addColor( color: Color ) {

    color.id = this.afs.createId();

    return this.colorsCollection.doc( color.id ).set( color);

   }

   updateColor( userkey, color: Color ) {
    return this.colorsCollection.doc( userkey ).set( color );
   }

   deleteColor( userkey ) {
     return this.colorsCollection.doc( userkey ).delete();
   }
}
