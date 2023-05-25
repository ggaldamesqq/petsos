import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private alertController: AlertController) {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenna: ['', Validators.required]
    });
  }

  entrar() {
    // Código para cambiar de ventana a las tabs
    this.router.navigate(['tabs']);
  }

  public login(): void {
    // if (this.loginForm.valid) {
    //   this.insertarUsuario(this.loginForm.value.correo, this.loginForm.value.contrasenna);
    // }
  }

  iniciarSesion(email: string, password: string) {
    this.http.post('https://pkn6z9r7jf.execute-api.us-east-1.amazonaws.com/desa', { email:email,password: password })
      .subscribe(
        (res:any) => {
          console.log(res);
          let responseBody = JSON.parse(res.body);
          if (responseBody.message == "Inicio de sesión exitoso") {
            this.router.navigate(['tabs']); // Navega a las tabs si el inicio de sesión fue exitoso
          }
          else if (responseBody.message == "La contraseña es incorrecta")
          {
            this.mostrarAlerta(JSON.stringify(responseBody.message ), "Error");
          }
          else if (responseBody.message == "El usuario no está activo"){
            this.mostrarAlerta(JSON.stringify(responseBody.message ), "Error");
          }
          else if (responseBody.message == "El usuario no existe"){
            this.mostrarAlerta(JSON.stringify(responseBody.message ), "Error");
          }
        },
        err => {
          this.mostrarAlerta(JSON.stringify(err.error), "Error");
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

  Registro() {
    this.router.navigate(['registro']);
  }

  ngOnInit() {
  }
}