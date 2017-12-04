import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseListObservable,AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the NuevaValoracionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nueva-valoracion',
  templateUrl: 'nueva-valoracion.html',
})
export class NuevaValoracionPage {
  keyUser;
  keyAuth;
  rateobj;
  rateprof;
  ratemoti;
  ratetrato;
  profValorada=false;
  tratoValorada=false;
  objValorada=false;
  motiValorada=false;
  propiedades=['profesionalidad','motivacion','objetivos','trato'];
  constructor(public navCtrl: NavController, public navParams: NavParams,public af:AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaValoracionPage');

  }
  ionViewDidEnter(){
    this.keyUser=this.navParams.get('key');
    this.keyAuth=localStorage.getItem('user_uid');
    this.getValoration();
  }
  getValoration(){
    this.propiedades.forEach(prop=>{
      this.af.object('valorados/'+this.keyUser+'/'+this.keyAuth+'/'+prop).forEach(data=> {
        if (data.$value != undefined) {
          if(prop=='profesionalidad'){
            this.rateprof = data.$value;
            this.profValorada=true;
          }else if(prop=='motivacion'){
            this.ratemoti = data.$value;
            this.motiValorada=true;
          }else if(prop=='objetivos'){
            this.rateobj = data.$value;
            this.objValorada=true;
          }else if(prop=='trato'){
            this.ratetrato = data.$value;
            this.tratoValorada=true;
          }
        }
      })
    })

  }
  onModelChange(e,t){
    console.log(this.rateprof);
    var sum=0;
    var sum2=0;
    var sum3=0;
    var sum4=0;
      if(t=='prof'){
        if(this.profValorada){
          let value=0;
          let total=0;
          this.af.object('valorados/'+this.keyUser+'/'+this.keyAuth+'/profesionalidad').forEach(data=>{
            value=data.$value;
          })
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/profesionalidad/prof'+value).forEach(totalProf=>{
            console.log(totalProf.$value);
            total=totalProf.$value;
          })
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/profesionalidad/prof'+value).set(total-1)
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/profesionalidad/prof'+this.rateprof).forEach(item=>{
            total=item.$value;
          })
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/profesionalidad/prof'+this.rateprof).set(total+1);
          this.af.object('valorados/'+this.keyUser+'/'+this.keyAuth+'/profesionalidad').set(this.rateprof);
        }else{
          var val=this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/profesionalidad/prof'+this.rateprof).forEach(data=>{
            sum = parseInt(data.$value) + 1;
            console.log(sum);
          });
          if(sum>1){
            this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/profesionalidad/prof'+this.rateprof).set(sum)
          }else{
            this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/profesionalidad/prof'+this.rateprof).set(1)
          }
          this.af.object('valorados/'+this.keyUser+'/'+this.keyAuth+'/profesionalidad').set(this.rateprof);
        }
      }

    else if(t=='moti'){
        if(this.motiValorada){
          let value=0;
          let total=0;
          this.af.object('valorados/'+this.keyUser+'/'+this.keyAuth+'/motivacion').forEach(data=>{
            value=data.$value;
          })
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/motivacion/moti'+value).forEach(totalMoti=>{
            console.log(totalMoti.$value);
            total=totalMoti.$value;
          })
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/motivacion/moti'+value).set(total-1)
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/motivacion/moti'+this.ratemoti).forEach(item=>{
            total=item.$value;
          })
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/motivacion/moti'+this.ratemoti).set(total+1);
          this.af.object('valorados/'+this.keyUser+'/'+this.keyAuth+'/motivacion').set(this.ratemoti);
        }else{
          var val=this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/motivacion/moti'+this.ratemoti).forEach(data=>{
            sum2 = parseInt(data.$value) + 1;
            console.log(sum2);
          });
          if(sum2>1){
            this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/motivacion/moti'+this.ratemoti).set(sum2)
          }else{
            this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/motivacion/moti'+this.ratemoti).set(1)
          }
          this.af.object('valorados/'+this.keyUser+'/'+this.keyAuth+'/motivacion').set(this.ratemoti);
        }

    }else if(t=='obj'){
        if(this.objValorada){
          let value=0;
          let total=0;
          this.af.object('valorados/'+this.keyUser+'/'+this.keyAuth+'/objetivos').forEach(data=>{
            value=data.$value;
          })
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/objetivos/obj'+value).forEach(totalObj=>{
            console.log(totalObj.$value);
            total=totalObj.$value;
          })
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/objetivos/obj'+value).set(total-1)
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/objetivos/obj'+this.rateobj).forEach(item=>{
            total=item.$value;
          })
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/objetivos/obj'+this.rateobj).set(total+1);
          this.af.object('valorados/'+this.keyUser+'/'+this.keyAuth+'/objetivos').set(this.rateobj);
        }else{
          var val=this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/objetivos/obj'+this.rateobj).forEach(data=>{
            sum3 = parseInt(data.$value) + 1;
            console.log(sum3);
          });
          if(sum3>1){
            this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/objetivos/obj'+this.rateobj).set(sum3)
          }else{
            this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/objetivos/obj'+this.rateobj).set(1)
          }
          this.af.object('valorados/'+this.keyUser+'/'+this.keyAuth+'/objetivos').set(this.rateobj);
        }

    }else if(t=='trato'){
        if(this.tratoValorada){
          let value=0;
          let total=0;
          this.af.object('valorados/'+this.keyUser+'/'+this.keyAuth+'/trato').forEach(data=>{
            value=data.$value;
          })
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/trato/trato'+value).forEach(totalTrato=>{
            console.log(totalTrato.$value);
            total=totalTrato.$value;
          })
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/trato/trato'+value).set(total-1)
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/trato/trato'+this.ratetrato).forEach(item=>{
            total=item.$value;
          })
          this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/trato/trato'+this.ratetrato).set(total+1);
          this.af.object('valorados/'+this.keyUser+'/'+this.keyAuth+'/trato').set(this.ratetrato);
        }else{
          var val=this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/trato/trato'+this.ratetrato).forEach(data=>{
            sum4 = parseInt(data.$value) + 1;
            console.log(sum4);
          });
          if(sum4>1){
            this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/trato/trato'+this.ratetrato).set(sum4)
          }else{
            this.af.object('entrenadores/'+this.keyUser+'/servicio/valoraciones/trato/trato'+this.ratetrato).set(1)
          }
          this.af.object('valorados/'+this.keyUser+'/'+this.keyAuth+'/trato').set(this.ratetrato);
        }
    }
  }

}
