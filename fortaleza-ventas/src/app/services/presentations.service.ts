import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Presentation } from '../models/presentation.model';

@Injectable({
  providedIn: 'root'
})
export class PresentationsService {

  private presentationsCollection: AngularFirestoreCollection<Presentation>;

  private presentations: Presentation[] = [];


  constructor( private afs: AngularFirestore ) {
                 
   }

   getPresentations() {

    this.presentationsCollection = this.afs.collection( 'presentations');

    return this.presentationsCollection.valueChanges()
                  .pipe(
                    map( resp => {
                      this.presentations = resp;
                      return this.presentations;
                    }));

   }

   addPresentation( presentation: Presentation ) {

    presentation.id = this.afs.createId();

    return this.presentationsCollection.doc( presentation.id ).set( presentation );

   }

   updatePresentation( userkey, presentation: Presentation ) {
    return this.presentationsCollection.doc( userkey ).set( presentation );
   }

   deletePresentation( userkey ) {
     return this.presentationsCollection.doc( userkey ).delete();
   }
}
