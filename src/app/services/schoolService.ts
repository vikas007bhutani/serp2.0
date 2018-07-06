import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IschoolModel } from '../models/schoolModel';
import { ServiceBase } from './serviceBase';

@Injectable()
export class SchoolService extends ServiceBase
{
   private baseurl: string=`${environment.api_url}`;
   constructor(private http: Http, private route: Router)
   {
      super(http,route)
   }

   getAllSchools():Observable<IschoolModel[]>
   {
       let apiUrl = this.baseurl +'api/School/GetAllSchool';
       return this.makeGetCall(apiUrl);
   }
}