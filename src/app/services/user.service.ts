import { Injectable } from '@angular/core';
import { ServiceBase } from './serviceBase';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { UserProfileDetail } from '../models/userProfileModel';

@Injectable()
export class UserService extends ServiceBase {

  private baseurl: string = `${environment.api_url}`;
  constructor(private http: Http, private route: Router) {
    super(http, route);
  }

  getAllStudents(pageIndex, pageSize): Observable<any> {
    var url = this.baseurl + `api/UserAccount/GetAllStudents?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.makeGetCall(url);
  }

  getAllStaffs(pageIndex, pageSize): Observable<any> {
    var url = this.baseurl + `api/UserAccount/GetAllStaff?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.makeGetCall(url);
  }

  getUserProfile(userId: number): Observable<UserProfileDetail> {
    var url = this.baseurl + `api/UserAccount/ProfileDetail?userId=${userId}`;
    return this.makeGetCall(url);
  }

  getPaymentUsers(query) :Observable<any[]> {
    var userRoleId = 4;
    var url = this.baseurl + `api/Common/UsersAutoCompletePaymentUsers?schoolId=${this.getSchoolId()}&userRoleId=${userRoleId}&userSearchString=${query}`;
    return this.makeGetCall(url);
  }

  updateUserProfile(userProfileModel:UserProfileDetail):Observable<string>
  {
    var url=this.baseurl + 'api/UserAccount/ProfileUpdate';
    let body = userProfileModel;
    return this.makePostCall(url,body);
  }

  updateExistingUserStatus(userId:number,status:boolean,updatedBy:number):Observable<boolean>
  {
    var url = this.baseurl + `api/UserAccount/UpdateExistingUserStatus?userId=${userId}&status=${status}&updatedBy=${updatedBy}`;
    return this.makeGetCall(url);
  }
}
