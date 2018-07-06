import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IpaymentModel } from '../models/paymentModel';
import { IpayFeeModel } from '../models/payFeeModel';
import { IfeeSectionModel } from '../models/feeSectionModel';
import { ServiceBase } from './serviceBase';

@Injectable()
export class PaymentService extends ServiceBase {
  private baseurl: string = `${environment.api_url}`;
  constructor(private http: Http, private route: Router) {
    super(http, route)
  }

  getPayments(type, pageIndex, pageSize): Observable<IpaymentModel[]> {
    if (type == 'self') {
      return this.getAllFeePaymentRecordsForCashier(pageIndex, pageSize);
    }
    else {
      return this.getAllFeePaymentRecordsByFliter(pageIndex, pageSize);
    }
  }

  getAllFeePaymentRecordsByFliter(pageIndex, pageSize): Observable<IpaymentModel[]> {
    let apiUrl = `${this.baseurl}api/Cashier/GetAllFeePaymentRecordsByFliter?schoolId=${this.getSchoolId()}&pageIndex=${pageIndex}&pageSize=${pageSize}&queryFilter=${''}`;
    return this.makeGetCall<IpaymentModel[]>(apiUrl);
  }

  getAllFeePaymentRecordsForCashier(pageIndex, pageSize): Observable<IpaymentModel[]> {
    let apiUrl = `${this.baseurl}api/Cashier/GetAllFeePaymentRecordsForCashier?cashierId=${this.getUserId()}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.makeGetCall<IpaymentModel[]>(apiUrl);
  }

  payFees(payFee: IpayFeeModel): Observable<any> {
    var userId = this.getUserId();
    payFee.cashierId = userId;
    payFee.paidBy = userId;
    payFee.schoolId = this.getSchoolId();

    //var qs = `paidAmount=${payFee.paidAmount}&balanceAmount=${payFee.balanceAmount}&paidBy=${userId}&cashierId=${userId}&studentId=${payFee.studentId}&schoolId=${this.getSchoolId()}&paymentReference=${payFee.paymentReference}`;
    let apiUrl = `${this.baseurl}api/Cashier/payFees`;
    return this.makePostCall<any>(apiUrl, payFee);
  }

  getFeeSectionsForMonths(classId, monthsOfYear) {
    var months = monthsOfYear.join(',');
    let apiUrl = `${this.baseurl}api/FeesAllocation/GetFeeSctionsForMonths?classId=${classId}&monthsOfYear=${months}&schoolId=${this.getSchoolId()}`;
    return this.makeGetCall<any>(apiUrl);
  }

  getTotalFeeOfMonth(studentId, months) {
    //var months = monthsOfYear.join(',');
    let apiUrl = `${this.baseurl}api/Cashier/GetTotalFeeOfMonth?schoolId=${this.getSchoolId()}&studentId=${studentId}`;
    return this.makePostCall<any>(apiUrl, months);
  }
}
