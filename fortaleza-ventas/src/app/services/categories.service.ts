import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesCollection: AngularFirestoreCollection<Category>;

  private categories: Category[] = [];


  constructor( private afs: AngularFirestore ) {
                 
   }

   getCategories() {

    this.categoriesCollection = this.afs.collection( 'categories', ref => ref.orderBy( 'createdDate', 'desc'));

    return this.categoriesCollection.valueChanges()
                  .pipe(
                    map( resp => {
                      this.categories = resp;
                      return this.categories;
                    }));

   }

   addCategory( category: Category ) {

    category.id = this.afs.createId();

    return this.categoriesCollection.doc( category.id ).set( category );

   }

   updateCategory( userkey, category: Category ) {
    return this.categoriesCollection.doc( userkey ).set( category );
   }

   deeleteCategory( userkey ) {
     return this.categoriesCollection.doc( userkey ).delete();
   } 
}
