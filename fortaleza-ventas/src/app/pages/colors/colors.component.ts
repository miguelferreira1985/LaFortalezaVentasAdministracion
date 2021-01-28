import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Color } from 'src/app/models/color.model';
import Swal from 'sweetalert2';

import { ColorsService } from '../../services/colors.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styles: [
  ]
})
export class ColorsComponent implements OnInit {

  colors: Color[] = [];
  color: Color = new Color();

  form: FormGroup;

  constructor( private colorsService: ColorsService, private formBuilder: FormBuilder ) {

    this.createColorForm();

    this.colorsService.getColors()
            .subscribe( resp => {
              this.colors = resp;
            });

   }

  ngOnInit(): void {
  }
  
  get invalidColor() {
    return this.form.get('color').invalid && this.form.get('color').touched;
  }

  get invalidCode() {
    return this.form.get('code').invalid && this.form.get('code').touched;
  }

  createColorForm() {

    this.form = this.formBuilder.group({
      id: [ '' ],
      code: [ '', Validators.required ],
      color: [ '', Validators.required ],
      description: [ '' ]
    });

  }

  clearForm() {
    this.form.reset();
  }

  fillForm( color: Color ) {
    this.form.reset({
      id: color.id,
      code: color.code,
      color: color.color,
      description: color.description
    });
  }


  submitColor ( value ) {
    
    if ( this.form.invalid ) { 
      
      return Object.values( this.form.controls ).forEach( control => {

        if( control instanceof FormGroup ){
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( direccion => direccion.markAsTouched() );
        } else {
          control.markAsTouched();
        }

      });

    }

    this.color = {
      id: value.id,
      code: value.code.toLowerCase(),
      color: value.color.toLowerCase(),
      description: value.description.toLowerCase(),
      createdDate: new Date(),
      updatedDate: new Date()
    }

    if ( value.id === '' ) {

      this.colorsService.addColor( this.color )
              .then( resp => {

                console.log(resp);
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'El color se guardo correctamente.',
                  showConfirmButton: false,
                  timer: 2000
                });
              }).catch( err =>{
                console.log( err );
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'El color no se guardo, intente nuevamente.',
                  showConfirmButton: false,
                  timer: 2000
                });
              });

    } else {
  
      this.colorsService.updateColor( value.id, this.color )
              .then( resp => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'El color se editó correctamente.',
                  showConfirmButton: false,
                  timer: 2000
                });
              }).catch( err => {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'El color NO se editó, intente nuevamente.',
                  showConfirmButton: false,
                  timer: 2000
                });
              });

    }

    this.clearForm();

  }

  deleteColor( color: Color ) {

    Swal.fire({
      title: `¿Esta seguro que desea eliminar el color ${ color.color.toUpperCase() }?`,
      text: 'Esta acción es permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      allowOutsideClick: false
    }).then( result => {
       
        if( result.isConfirmed ) {

          this.colorsService.deleteColor( color.id )
          .then( resp => {
            Swal.fire( '¡Color borrado!', 'El color se borro con exito', 'success');
          }).catch( err => {
            Swal.fire( '¡Color NO borrado!', 'El color nose pudo borrar, intente nuevamente', 'error');
          });

        }
        
    });
    
  }

}
