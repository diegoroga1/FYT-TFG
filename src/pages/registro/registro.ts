import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the Registro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class Registro {
  formRegister: FormGroup;
  showRegister=false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public auth:AngularFireAuth,
              public fb:AngularFireDatabase

  ) {
    this.formRegister=this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registro');
  }
  mostrarRegistroCorreo(){
  this.showRegister=!this.showRegister;
  }
  crearUsuario(){
    if(this.confirmPassword()){
      this.auth.auth.createUserWithEmailAndPassword(this.formRegister.value.email,this.formRegister.value.passwordRetry.password)
        .then(success=> {
          console.log(success);
          if(this.formRegister.value.rol=="usuario"){
            this.fb.object('usuarios/' + success.uid).set({
              nombre: this.formRegister.value.nombre,
              apellidos: this.formRegister.value.apellidos,
              email: this.formRegister.value.email,
              rol: this.formRegister.value.rol
            })
          }else{
            this.fb.object('usuarios/' + success.uid).set({
              email: this.formRegister.value.email,
            });
            this.fb.object('entrenadores/'+success.uid).set({
              nombre: this.formRegister.value.nombre,
              apellidos: this.formRegister.value.apellidos,
              email: this.formRegister.value.email,
              rol: this.formRegister.value.rol,
              estado:"Pendiente"
            })
          }

        }).catch(error=>{
          console.log(error);
      })
    }

  }
  confirmPassword(){
    if(this.formRegister.value.passwordRetry.password==this.formRegister.value.passwordRetry.passwordConfirm){
        return true;
      }
  }
  private createForm(){
      return this.formBuilder.group({
        nombre:['',[Validators.required]],
        apellidos:['',[Validators.required]],
        email:['',[Validators.required]],
        passwordRetry:this.formBuilder.group({
          password: ['', [Validators.required]],
          passwordConfirm: ['', [Validators.required]]
        }),
        rol:['',[Validators.required]]
      });
  }
}
