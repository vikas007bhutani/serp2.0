import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IledgerModel } from '../models/ledgerModel';
import { ServiceBase } from './serviceBase';
import { IDeparmentsModel } from '../models/departmentsModel';

@Injectable()
export class LedgerService extends ServiceBase {
  private baseurl: string = `${environment.api_url}`;
  constructor(private http: Http, private route: Router) {
    super(http, route)
  }

  getLedger(pageindex, pagesize, filter, model): Observable<IledgerModel[]> {
    let apiUrl = this.baseurl + 'api/Admin/GetLedgerGridListByFilter' + '?' + 'cashierId=' + model.cashierId + '&' + 'parentLedgerId=' + model.parentLedgerId + '&' + 'pageIndex=' + pageindex + '&' + 'pageSize=' + pagesize + '&' + 'queryFilter=' + filter;
    return this.makeGetCall(apiUrl);
  }

  getDepartments(): Observable<IDeparmentsModel[]> {
    let apiUrl = this.baseurl + 'api/Admin/Deparments' + '?' + 'schoolId=' + this.getSchoolId();
    return this.makeGetCall(apiUrl);

  }

  createorUpdateLedger(body): Observable<any> {
    body.schoolId = this.getSchoolId();
    body.createdBy = this.getUserId();
    body.updatedBy = this.getUserId();
    let apiUrl = this.baseurl + 'api/Admin/CreateAdminLedgerDetail';
    return this.makePostCall(apiUrl,body);

  }
}
