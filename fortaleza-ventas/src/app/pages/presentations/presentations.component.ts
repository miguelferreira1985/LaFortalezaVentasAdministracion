import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Presentation } from '../../models/presentation.model';
import { PresentationsService } from '../../services/presentations.service';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styles: [
  ]
})
export class PresentationsComponent implements OnInit {

  presentations: Presentation[] = [];
  presentation: Presentation = new Presentation();

  form: FormGroup;

  constructor( private presentationsService: PresentationsService, private formBuilder: FormBuilder ) {

    this.createPresentationForm();

    this.presentationsService.getPresentations()
            .subscribe( resp => {
              this.presentations = resp;
            });

   }

  ngOnInit(): void {
  }

  createPresentationForm() {

    this.form = this.formBuilder.group({
      id: [ '' ],
      code: [ '', Validators.required ],
      presentation: [ '', Validators.required ],
      description: [ '' ]
    });

  }

  clearForm() {
    this.form.reset();
  }

  fillForm( presentation: Presentation ) {
    this.form.reset({
      id: presentation.id,
      code: presentation.code,
      presentation: presentation.presentation,
      description: presentation.description
    });
  }


  submitPresentation ( value ) {
    
    if ( this.form.invalid ) { return; }

    this.presentation = {
      id: value.id,
      code: value.code.toLowerCase(),
      presentation: value.presentation.toLowerCase(),
      description: value.description.toLowerCase(),
      createdDate: new Date(),
      updatedDate: new Date()
    }

    if ( value.id === '' ) {

      this.presentationsService.addPresentation( this.presentation );

    } else {
  
      this.presentationsService.updatePresentation( value.id, this.presentation );

    }

    this.clearForm();

  }

  deletePresentation( presentation: Presentation ) {

    Swal.fire({
      title: `¿Esta seguro que desea eliminar la presentación ${ presentation.presentation.toUpperCase() }?`,
      text: 'Esta acción es permanente',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false
    }).then( resp => {
       
        if( resp.value ) {

          this.presentationsService.deletePresentation( presentation.id )
          .then( resp => {
            console.log( resp );
          }, err => {
            console.log( err );
          });

        }
        
    });
    
  }

}
