import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CorreoService } from '../correo.service';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-editar-publicacion',
  templateUrl: './editar-publicacion.component.html',
  styleUrls: ['./editar-publicacion.component.scss']
})
export class EditarPublicacionComponent implements OnInit {
  public publicacionForm: FormGroup;
  publicacionId: Number | null = null;
  ubicacionValue: string = '';
  markerPosition: any;
  selectedFile: File | null = null;
  base64Image: string | null = null;
  correo : string = '' ;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private correoService: CorreoService,
    private modalController: ModalController,
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
  public actualizar(): void {
    const ubicacion = this.publicacionForm.get('ubicacion')?.value;
    console.log(ubicacion);
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

    if (ubicacion && this.base64Image && titulo && description && categoriaTexto && especie && raza && nombre && tipo && contacto) {
      this.ActualizarPublicacion(titulo, description, categoriaTexto, especie, raza, nombre, tipo, contacto, this.base64Image);
    } else {
      // Maneja el caso en el que algún valor sea nulo
    }
  }

  ActualizarPublicacion(
    titulo: string,
    descripcion: string,
    categoria: string,
    especie: string,
    raza: string,
    nombre: string,
    tipo: string,
    contacto: string,
    imagen: string
  ) {
    const ubicacion = this.publicacionForm.get('ubicacion')?.value;
    console.log(ubicacion);
    const latitud = typeof ubicacion === 'object' ? ubicacion.lat.toString() : ubicacion.split(',')[0].trim();
    const longitud = typeof ubicacion === 'object' ? ubicacion.lng.toString() : ubicacion.split(',')[1].trim();

    console.log('Latitud:', latitud);
    console.log('Longitud:', longitud);

    console.log(latitud, longitud);
    this.publicacionId = Number(this.route.snapshot.paramMap.get('id'));
    const datosPublicacion = {
      id: this.publicacionId,
      titulo: titulo,
      descripcion: descripcion,
      categoria: categoria,
      especie: especie,
      raza: raza,
      nombre: nombre,
      tipo: tipo,
      contacto: contacto,
      latitud: latitud,
      longitud: longitud,
      imagen: imagen,
    };

    console.log(datosPublicacion);

    this.http
      .post('https://aw5xpejrp2.execute-api.us-east-1.amazonaws.com/desarrollo', datosPublicacion)
      .subscribe(
        (res: any) => {
          console.log(res);
          let responseBody = JSON.parse(res.body);
          if (responseBody.message == "Publicación actualizada correctamente") {
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

  ngOnInit(): void {
    this.publicacionId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.publicacionId) {
      this.MostrarDatosPublicacions(this.publicacionId);
    }
  }
  MostrarDatosPublicacions(id:Number) {
    this.http.post('https://0ljuxafhh5.execute-api.us-east-1.amazonaws.com/desa', {id})
      .subscribe(
        (res:any) => {
          const responseBody = JSON.parse(res.body);
          const InformacionPublicacion = responseBody.data;
          console.log(InformacionPublicacion);
          console.log(InformacionPublicacion[0].titulo);

          const categoriaDB = InformacionPublicacion[0].categoria;
          
          let categoriaTexto = '';
          if (categoriaDB === 'Mascota perdida') {
            categoriaTexto = 'option1';
          } else if (categoriaDB === 'Animales en abandono') {
            categoriaTexto = 'option2';}
          
      
          this.publicacionForm.patchValue({
            titulo: InformacionPublicacion[0].titulo,
            description: InformacionPublicacion[0].descripcion,
            categoria: categoriaTexto,
            ubicacion:InformacionPublicacion[0].latitud +','+InformacionPublicacion[0].longitud ,
            especie: InformacionPublicacion[0].especie,
            raza: InformacionPublicacion[0].raza,
            nombre: InformacionPublicacion[0].nombre,
            tipo: InformacionPublicacion[0].tipo,
            contacto: InformacionPublicacion[0].contacto

            // Establecer los demás campos de acuerdo a los datos recibidos
          });
          console.log(this.publicacionForm);
        },
        err => {
        }
      );
  }
 
}