import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: [
  ]
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  category: Category = new Category();

  form: FormGroup;

  constructor( private categoriesService: CategoriesService, private formBuilder: FormBuilder ) {

    this.createCategoryForm();

    this.categoriesService.getCategories()
            .subscribe( resp => {
              this.categories = resp;
            });

   }

  ngOnInit(): void {
  }

  createCategoryForm() {

    this.form = this.formBuilder.group({
      id: [ '' ],
      code: [ '', Validators.required ],
      category: [ '', Validators.required ],
      description: [ '' ]
    });

  }

  clearForm() {
    this.form.reset();
  }

  fillForm( category: Category ) {
    this.form.reset({
      id: category.id,
      code: category.code,
      color: category.category,
      description: category.description
    });
  }


  submitCategory ( value ) {
    
    if ( this.form.invalid ) { return; }

    this.category = {
      id: value.id,
      code: value.code.toLowerCase(),
      category: value.category.toLowerCase(),
      description: value.description.toLowerCase(),
      createdDate: new Date(),
      updatedDate: new Date()
    }

    if ( value.id === '' ) {

      this.categoriesService.addCategory( this.category );

    } else {
  
      this.categoriesService.updateCategory( value.id, this.category );

    }

    this.clearForm();

  }

  deleteCategory( category: Category ) {

    Swal.fire({
      title: `¿Esta seguro que desea eliminar la categoría ${ category.category.toUpperCase() }?`,
      text: 'Esta acción es permanente',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false
    }).then( resp => {
       
        if( resp.value ) {

          this.categoriesService.deeleteCategory( category.id )
          .then( resp => {
            console.log( resp );
          }, err => {
            console.log( err );
          });

        }
        
    });
    
  }

}
