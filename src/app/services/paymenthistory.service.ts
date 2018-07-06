import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IpaymentsHistoryModel } from '../models/paymentshistoryModel';
import { ServiceBase } from './serviceBase';

@Injectable()
export class PaymentHistoryService extends ServiceBase {
  private baseurl: string = `${environment.api_url}`;
  constructor(private http: Http, private route: Router) {
    super(http, route)
  }

  getPayments(filter,paging): Observable<IpaymentsHistoryModel[]> {
    var schoolId = this.getSchoolId();
    let body = { filter: filter, paging: paging, schoolId: schoolId };
    let apiUrl = this.baseurl + 'api/Payment/PaymentHistory';
    return this.makePostCall(apiUrl,body);
  }
}
