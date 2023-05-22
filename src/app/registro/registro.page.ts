import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import cryptoRandomString from 'crypto-random-string';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  randomCode: string = '';
  registerForm = new FormGroup({
    user: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confpassword: new FormControl('', [Validators.required, Validators.minLength(4)]), // Añade esta línea
  });

  constructor(private storage: Storage, private http: HttpClient, private router: Router,private alertController: AlertController) { }


  async onSubmit() {
    const { user, email, password, confpassword } = this.registerForm.value;
    console.log('Username:', user);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('ConfPassword:', confpassword);

    this.generateVerificationCode();

    if (email && password && user && this.randomCode) {
      this.insertarUsuario(email, password, user, this.randomCode);
      await this.storage.create(); // Crear la base de datos
      this.storage.remove('correo').then(() => {
        this.storage.set('correo', email).then(() => {
          this.router.navigate(['pagina-validacion']);
        });
      });
    }
  }

  generateVerificationCode() {
    this.randomCode = cryptoRandomString({ length: 10, type: 'base64' });
    console.log(this.randomCode);
  }

  insertarUsuario(email: string, password: string, user: string, codigo: string) {

    this.http.post('https://1d0k9zgx8h.execute-api.us-east-1.amazonaws.com/desa', { email: email,password: password,user: user,codigo: codigo })
      .subscribe(
        (res:any) => {
          console.log(res); 
          let responseBody = JSON.parse(res.body);
          if (responseBody.message == "El usuario ya existe") {
              this.mostrarAlerta(JSON.stringify(responseBody.message ),'Error');
          }
          else
          {
            this.router.navigate(['pagina-validacion']); // Navega a las tabs si la inserción fue exitosa
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
  ngOnInit() {
  }

}
