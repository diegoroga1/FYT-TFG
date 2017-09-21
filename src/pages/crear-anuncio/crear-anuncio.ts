import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
/**
 * Generated class for the CrearAnuncio page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-crear-anuncio',
  templateUrl: 'crear-anuncio.html',
})
export class CrearAnuncio {
  formulario: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder) {
    this.formulario=this.fb.group({
      'titulo':['',[Validators.required,Validators.minLength(5), Validators.maxLength(25)]],
      'descripcion':['',[Validators.required,Validators.minLength(15), Validators.maxLength(120)]],
      'especialidad':['']
    })

  }
  crearAnuncio(){
      alert(JSON.stringify(this.formulario.value));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearAnuncio');
  }

}
