import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public publicacionForm: FormGroup;
  ubicacionValue: string = '';
  markerPosition: any;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalController: ModalController,
    private http : HttpClient
  ) {
    this.publicacionForm = this.formBuilder.group({
      ubicacion: ['', Validators.required],
      selectedFile: [null, Validators.required],
      titulo: ['', Validators.required],
      description: ['', Validators.required],
      categoria: ['option1'], // Valor por defecto
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      contacto: ['', Validators.required]
    });
  }

  async abrirMapaModal() {
    const modal = await this.modalController.create({
      component: MapModalComponent,
      cssClass: 'map-modal',
      componentProps: {
        ubicacion: this.markerPosition
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log('Datos seleccionados:', data);

    if (data && data.ubicacion) {
      this.publicacionForm.patchValue({ ubicacion: data.ubicacion });
      this.ubicacionValue = `${data.ubicacion.lat}, ${data.ubicacion.lng}`;
      this.markerPosition = data.ubicacion;
    }
  }

  async obtenerUbicacionActual() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.ubicacionValue = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;

    this.publicacionForm.patchValue({ ubicacion: this.ubicacionValue });
    this.markerPosition = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
  }

  public publicar(): void {
    const ubicacion = this.publicacionForm.get('ubicacion')?.value;
    const selectedFile = this.publicacionForm.get('selectedFile')?.value;
    const titulo = this.publicacionForm.get('titulo')?.value;
    const description = this.publicacionForm.get('description')?.value;
    const categoria = this.publicacionForm.get('categoria')?.value;
    const especie = this.publicacionForm.get('especie')?.value;
    const raza = this.publicacionForm.get('raza')?.value;
    const nombre = this.publicacionForm.get('nombre')?.value;
    const tipo = this.publicacionForm.get('tipo')?.value;
    const contacto = this.publicacionForm.get('contacto')?.value;
  
    // Obtén el texto correspondiente a la categoría seleccionada
    let categoriaTexto = '';
    if (categoria === 'option1') {
      categoriaTexto = 'Mascota perdida';
    } else if (categoria === 'option2') {
      categoriaTexto = 'Animales en abandono';
    } else if (categoria === 'option3') {
      categoriaTexto = 'Servicio';
    }
  
    // Utiliza los valores del formulario
    console.log('Ubicación:', ubicacion);
    console.log('Selected File:', selectedFile);
    console.log('Título:', titulo);
    console.log('Descripción:', description);
    console.log('Categoría:', categoriaTexto);
    console.log('Especie:', especie);
    console.log('Raza:', raza);
    console.log('Nombre:', nombre);
    console.log('Tipo:', tipo);
    console.log('Contacto:', contacto);
  
    if (ubicacion && selectedFile && titulo && description && categoriaTexto && especie && raza && nombre && tipo && contacto) {
      // Convierte el archivo seleccionado a formato base64
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   const base64Data = reader.result as string;
      //   // Aquí puedes utilizar la variable 'base64Data' que contiene el archivo en formato base64
      //   console.log('Archivo seleccionado en formato base64:', base64Data);

       
        this.IngresarPublicacion(titulo, description, categoriaTexto, especie, raza, nombre, tipo, contacto);
   
      // };
      // reader.readAsDataURL(selectedFile);
    } else {
      // Maneja el caso en el que algún valor sea nulo
    }
  }
  
  IngresarPublicacion(titulo: string, descripcion: string, categoria: string, especie: string, raza: string, nombre: string, tipo: string, contacto: string) {
    const datosPublicacion = {
      titulo: titulo,
      descripcion: descripcion,
      categoria: categoria,
      especie: especie,
      raza: raza,
      nombre: nombre,
      tipo: tipo,
      contacto: contacto,
      // imagen: base64Data
    };
    this.http.post('https://os3ry5kxxh.execute-api.us-east-1.amazonaws.com/desa', datosPublicacion)
    .subscribe(
      (res: any) => {
        console.log(res);
        let responseBody = JSON.parse(res.body);
        if (responseBody.message == "Publicación guardada y publicada correctamente") {
          this.router.navigate(['tabs/tab3']); // Navega a las tabs si la publicación fue guardada y publicada correctamente
        }
      },
      err => {
        console.error('Error al enviar la publicación:', err);
      }
    );
    // Realiza la lógica para ingresar la publicación utilizando los datos recibidos
  
    console.log('Datos de la publicación:', datosPublicacion);
    // Realiza la lógica para ingresar la publicación utilizando los datos recibidos
  }
  
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];
    }
  }

  ngOnInit() {}
}


