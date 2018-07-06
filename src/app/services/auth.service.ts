import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ServiceBase } from './serviceBase';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../models/loginRequestModel';

@Injectable()
export class AuthService extends ServiceBase
 {
   
  private baseurl: string=`${environment.api_url}`;
  constructor(private http: Http, private route: Router) 
  { 
         super(http,route)
  }
  
  login(schoolId:string, loginRequest : LoginRequest)
  {
    let body = JSON.stringify(loginRequest);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('schoolID',schoolId);
    let options = new RequestOptions({ headers : headers });
    return this.http.post(this.baseurl + 'api/UserAccount/AuthenticateUser', body, options).map(res => res.json())
  }

}
