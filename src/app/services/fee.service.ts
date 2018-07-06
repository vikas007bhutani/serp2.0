import { Injectable, Inject } from '@angular/core';
import { Http, Response,RequestOptions,Headers} from '@angular/http';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { ServiceBase } from './serviceBase';
import {ifeemodle,iclassmodel, iupdaterequest } from '../models/feeAllocationModel';

@Injectable()
export class FeeService extends ServiceBase {
  private baseurl: string=`${environment.api_url}`;
	constructor( @Inject(Http) public http: Http, private route: Router) {
		super(http,route)
	}
	getItems(selectedclass): Observable<ifeemodle[]> { 
		let URL=`${this.baseurl}api/FeesAllocation/Getfeedata?schoolId=${this.getSchoolId()}&classid=${selectedclass}`;
		return  this.makeGetCall(URL);
	 }
	getclasses(): Observable<iclassmodel[]> {
		let apiUrl = this.baseurl +'api/Common/Classes';
		return  this.makeGetCall(apiUrl);
	}
	UpdateFeeAllocation(body): Observable<any> {
		let apiUrl = this.baseurl + 'api/FeesAllocation/updateAllocateFees';
		return  this.makePostCall<any>(apiUrl,body);
	
	   }

}
