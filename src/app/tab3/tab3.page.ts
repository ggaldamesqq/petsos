import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { CorreoService } from '../correo.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  // Esconder formulario
  formularioUsuario: boolean = true;
  formularioAdmin: boolean = true;
  userRole: string = "normal"; // Aquí reemplazar con el rol


  public publicacionForm!: FormGroup;
  ubicacionValue: string = '';
  markerPosition: any;
  selectedFile: File | null = null;
  base64Image: string | null = null;
  correo: string = '';
  tipo: string = '';

  ngOnInit() {
    const emailLS = localStorage.getItem('email');
    if (emailLS) {
      this.correo = emailLS; // Asignar el valor del localStorage a la variable correo
    } else {
      this.correo = ''; // Asignar un valor por defecto si no hay correo en el localStorage
    }

    const tipoLS = localStorage.getItem('tipo');
    if (tipoLS) {
      this.tipo = tipoLS;
    } else {
      // Asigna un valor por defecto si no hay un valor en localStorage
      this.tipo = 'normala';
    }

    console.log(emailLS, this.tipo);

    //Esconder formulario
    if (this.tipo == 'normal') {
      this.formularioUsuario = true; //Mostrar formulario usuario
      this.formularioAdmin = false; //Esconder formulario admin

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
    else {
      this.formularioUsuario = false; //Esconder formulario usuario
      this.formularioAdmin = true; //Mostrar formulario admin

      this.publicacionForm = this.formBuilder.group({
        titulo: ['', Validators.required],
        ubicacion: ['', Validators.required],
        selectedFile: [null, Validators.required],
        paginaWeb: [''],
        categoriaAdmin: ['option1'], // Valor por defecto
        contacto: ['', Validators.required]
      });
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalController: ModalController,
    private http: HttpClient,
    private correoService: CorreoService
  ) {

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
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.ubicacionValue = `${coordinates.coords.latitude}, ${coordinates.coords.longitude}`;
      this.markerPosition = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };
      this.publicacionForm.patchValue({ ubicacion: this.ubicacionValue });


      console.log(this.publicacionForm);
    } catch (error) {
      console.error('Error al obtener la ubicación actual:', error);
    }
  }

  public publicar(): void {
    const ubicacion = this.publicacionForm.get('ubicacion')?.value;
    console.log(ubicacion);
    const selectedFile = this.publicacionForm.get('selectedFile')?.value ?? ' ';
    const titulo = this.publicacionForm.get('titulo')?.value ?? ' ';
    const description = this.publicacionForm.get('description')?.value ?? ' ';
    const categoria = this.publicacionForm.get('categoria')?.value ?? ' ';
    const categoriaAdmin = this.publicacionForm.get('categoriaAdmin')?.value ?? ' ';

    const especie = this.publicacionForm.get('especie')?.value ?? ' ';
    const raza = this.publicacionForm.get('raza')?.value ?? ' ';
    const nombre = this.publicacionForm.get('nombre')?.value ?? ' ';
    const tipo = this.publicacionForm.get('tipo')?.value ?? ' ';
    const contacto = this.publicacionForm.get('contacto')?.value ?? ' ';
    const paginaWeb = this.publicacionForm.get('paginaWeb')?.value ?? ' ';



    // Obtén el texto correspondiente a la categoría seleccionada
   

    // // Utiliza los valores del formulario
    // console.log('Ubicación:', ubicacion);
    // console.log('Selected File:', selectedFile);
    // console.log('Título:', titulo);
    // console.log('Descripción:', description);
    // console.log('Categoría:', categoriaTexto);
    // console.log('Especie:', especie);
    // console.log('Raza:', raza);
    // console.log('Nombre:', nombre);
    // console.log('Tipo:', tipo);
    // console.log('Contacto:', contacto);

    if (this.tipo == 'normal')
    {
      let categoriaTexto = '';
      if (categoria === 'option1') {
        categoriaTexto = 'Mascota perdida';
      } else if (categoria === 'option2') {
        categoriaTexto = 'Animales en abandono';
      } 

      if (ubicacion && this.base64Image && titulo && description && categoriaTexto && especie && raza && nombre && tipo && contacto) {
        this.IngresarPublicacion(titulo, description, categoriaTexto, especie, raza, nombre, tipo, contacto, paginaWeb, this.base64Image,'');
      } else {
        // Maneja el caso en el que algún valor sea nulo
      }
    }
    else{
      let categoriaTexto = '';
      if (categoriaAdmin === 'option1') {
        categoriaTexto = 'Tienda';
      } else if (categoriaAdmin === 'option2') {
        categoriaTexto = 'Veterinaria';
      }

      if (ubicacion && this.base64Image && titulo && description && categoriaTexto && especie && raza && nombre && tipo && contacto) {
        this.IngresarPublicacion(titulo, description, '', especie, raza, nombre, tipo, contacto, paginaWeb, this.base64Image,categoriaTexto );
      } else {
        // Maneja el caso en el que algún valor sea nulo
      }
    }
  }

  IngresarPublicacion(
    titulo: string,
    descripcion: string,
    categoria: string,
    especie: string,
    raza: string,
    nombre: string,
    tipo: string,
    contacto: string,
    paginaWeb: string,
    imagen: string,
    categoriaAdmin: string
  ) {
    const ubicacion = this.publicacionForm.get('ubicacion')?.value;
    console.log(ubicacion);
    const latitud = typeof ubicacion === 'object' ? ubicacion.lat.toString() : ubicacion.split(',')[0].trim();
    const longitud = typeof ubicacion === 'object' ? ubicacion.lng.toString() : ubicacion.split(',')[1].trim();

    console.log('Latitud:', latitud);
    console.log('Longitud:', longitud);

    console.log(latitud, longitud);
    const emailLS = localStorage.getItem('email');

    if (this.tipo == 'normal') {
      const datosPublicacion = {
        titulo: titulo,
        descripcion: descripcion,
        categoria: categoria,
        especie: especie,
        raza: raza,
        correo: emailLS ? emailLS : '',
        nombre: nombre,
        tipo: tipo,
        contacto: contacto,
        latitud: latitud,
        longitud: longitud,
        imagen: imagen
      };

      console.log(datosPublicacion);
      this.IngresarPublicacionUsuario(datosPublicacion);

    }
    else {
      console.log("entraadmin");
      const datosPublicacion = {
        titulo: titulo,
        categoria: categoriaAdmin,
        tipo: tipo,
        correo: emailLS ? emailLS : '',
        contacto: contacto,
        longitud: longitud,
        latitud: latitud,
        paginaWeb: paginaWeb,
        imagen: imagen
      };

      this.IngresarPublicacionAdmin(datosPublicacion);
    }

  }
  public IngresarPublicacionUsuario(datosPublicacion: any) {
    this.http
      .post('https://os3ry5kxxh.execute-api.us-east-1.amazonaws.com/desa', datosPublicacion)
      .subscribe(
        (res: any) => {
          console.log(res);
          let responseBody = JSON.parse(res.body);
          if (responseBody.message == "Publicación guardada y publicada correctamente") {
            location.reload();
            // this.router.navigate(['tabs/tab2']);
            console.log(datosPublicacion);

          }
        },
        err => {
          console.error('Error al enviar la publicación:', err);
        }
      );

    console.log('Datos de la publicación:', datosPublicacion);

  }

  public IngresarPublicacionAdmin(datosPublicacion: any) {
    this.http
      .post('https://p0akcomwk2.execute-api.us-east-1.amazonaws.com/desa', datosPublicacion)
      .subscribe(
        (res: any) => {
          console.log(res);
          let responseBody = JSON.parse(res.body);
          console.log(responseBody);
          if (responseBody.message == "Publicación guardada y publicada correctamente") {
            location.reload();
            // this.router.navigate(['tabs/tab2']);
            // console.log(datosPublicacion);

          }
        },
        err => {
          console.error('Error al enviar la publicación:', err);
        }
      );

    console.log('Datos de la publicación:', datosPublicacion);

  }

  onFileChange(event: any): void {
    const files = event.target.files;

    if (files && files.length) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.base64Image = reader.result as string;
      };
      reader.readAsDataURL(files[0]);
    }
  }




}


