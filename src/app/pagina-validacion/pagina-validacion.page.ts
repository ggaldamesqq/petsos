import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-pagina-validacion',
  templateUrl: './pagina-validacion.page.html',
  styleUrls: ['./pagina-validacion.page.scss'],
})
export class PaginaValidacionPage implements OnInit {
  validacionForm: FormGroup;
  verificationCode: string = '';
  correo : string = "";

  constructor(private storage: Storage,private router:Router,private http: HttpClient, private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, private alertController: AlertController) {
    this.validacionForm = this.formBuilder.group({
      codigo: ['', Validators.required]
    });
  }

  verifyCode() {

    const { codigo } = this.validacionForm.value;
    console.log('Email:', this.correo);
    console.log('Codigo:', codigo);
    if (this.correo && codigo) {
      this.ValidarUsuario(this.correo, codigo);
    }
    else{
      this.mostrarAlerta("Código de verificación incorrecto.", "Error");
      
    }
  }
  ValidarUsuario(correo: string, codigo: string) {
    this.http.post('https://ortwej33vj.execute-api.us-east-1.amazonaws.com/desa', { email:correo,codigo: codigo })
      .subscribe(
        (res: any) => {
          console.log(res);
          // Parsea el cuerpo de la respuesta a un objeto JSON
          let responseBody = JSON.parse(res.body);
          // Comprueba si la validación fue exitosa
          if (responseBody.message == "El código fue validado correctamente.") {
            this.router.navigate(['login']); // Navega a las tabs si la validación fue exitosa
          } else {
            this.mostrarAlerta("Error", responseBody.message || 'Código incorrecto');
            // Muestra un mensaje de error si la validación falló
          }
        },
        err => {
          this.mostrarAlerta(JSON.stringify(err.error.sqlMessage || err.error), "Error");
        }
      );
  }
  
  async mostrarAlerta(mensaje: string, header:string) {
    const alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: ['Aceptar']
    });

    await alert.present();
  }


  ngOnInit() {
    this.storage.get('correo').then((correo) => {
      this.correo = correo;
      console.log('Correo:', correo);
      // Utiliza el valor del correo como desees en tu lógica de la página "pagina-validacion"
    });
  
  }
}
