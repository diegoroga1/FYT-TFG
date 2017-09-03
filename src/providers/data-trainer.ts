import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {ajaxGetJSON} from "rxjs/observable/dom/AjaxObservable";

/*
 Generated class for the DataTrainer provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class DataTrainer {
  data:any;
  json:any;
  datos_json:any;
  constructor(public http: Http) {
    console.log('Hello DataTrainer Provider');

  }
  getData() {
    return this.http.get('./mijson.json').map((res: Response) => res.json());
  }
}

