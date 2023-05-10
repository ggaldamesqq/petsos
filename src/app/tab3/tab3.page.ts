import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public publicacionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    
    this.publicacionForm = this.formBuilder.group({
      ubicacion: ['', Validators.required],
      selectedFile: ['', Validators.required],
      titulo: ['', Validators.required],
      description: ['', Validators.required],
      categoria: ['option1'] // Valor por defecto
    });

  }


  public publicar(): void {
    // Código para crear publicacion
  }

  ngOnInit(){ 
  }

}
