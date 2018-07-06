import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ServiceBase } from './serviceBase';


@Injectable()
export class CommonService extends ServiceBase {
  private baseurl: string = `${environment.api_url}`;
  constructor(private http: Http, private route: Router) {
    super(http, route)
  }

  getSections(): Observable<any> {
    let apiUrl = this.baseurl + 'api/Common/Sections';
    return this.makeGetCall(apiUrl); 

  }

  getClasses(): Observable<any> {
    let apiUrl = this.baseurl + 'api/Common/Classes';
    return this.makeGetCall(apiUrl);

  }
  
}
