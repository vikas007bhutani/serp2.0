import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

export class ServiceBase {

  private jwtHelper: JwtHelper = new JwtHelper();
  public CurrentUserRoleId : number = -1;
  constructor(private basehttp: Http, private router: Router) {
    let auth = localStorage.getItem('auth');
    let authData = localStorage.getItem('authorizationData')
    if (auth != undefined || auth != null) {

      var authModel = JSON.parse(auth);
      this.CurrentUserRoleId = authModel.userRoleId;
    }

  }

  public getSchoolId() {
    var schoolId = null;
    let auth = localStorage.getItem('auth');
    let authData = localStorage.getItem('authorizationData')
    if (auth != undefined || auth != null) {

      var authModel = JSON.parse(auth);
      schoolId = authModel.schoolId
    }

    return schoolId;
  }
  public getUserId() {
    var userId = null;
    let auth = localStorage.getItem('auth');
    let authData = localStorage.getItem('authorizationData')
    if (auth != undefined || auth != null) {

      var authModel = JSON.parse(auth);
      userId = authModel.userId
    }

    return userId;
  }

  public getRequestHeader(): RequestOptions {
    let authToken = "";
    let auth = localStorage.getItem('auth');
    let authData = localStorage.getItem('authorizationData')
    if (auth != undefined || auth != null) {

      var authModel = JSON.parse(auth);
      //authToken = authModel.Token;
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'q= 0.8;application / json; q = 0.9');
    headers.append('schoolID', authModel.schoolId);
    headers.append('Authorization', 'Basic ' + authData);
    // headers.append('Authorization', `Bearer ${authToken}`);
    return new RequestOptions({ headers: headers });
  }

  public makeGetCall<T>(apiUrl: string): Observable<T> {
    if (this.checkAuthenticated()) {
      let options = this.getRequestHeader();
      return this.basehttp.get(apiUrl, options).map(res => res.json());
    }
    else {
      this.router.navigate(['']);
      return new Observable<T>();
    }
  }

  public makeDeleteCall<T>(apiUrl: string): Observable<T> {
    if (this.checkAuthenticated()) {
      let options = this.getRequestHeader();
      return this.basehttp.delete(apiUrl, options).map(res => res.json());
    }
    else {
      this.router.navigate(['/login']);
      return new Observable<T>();
    }

  }

  public makePostCall<T>(apiUrl: string, body: any): Observable<T> {
    if (this.checkAuthenticated()) {
      let options = this.getRequestHeader();
      return this.basehttp.post(apiUrl, body, options).map(res => res.json());
    }
    else {
      this.router.navigate(['/login']);
      return new Observable<T>();
    }

  }
  public makePutCall<T>(apiUrl: string, body: string): Observable<T> {
    if (this.checkAuthenticated()) {
      let options = this.getRequestHeader();
      return this.basehttp.put(apiUrl, body, options).map(res => res.json());
    }
    else {
      this.router.navigate(['/login']);
      return new Observable<T>();
    }

  }

  public checkAuthenticated(): boolean {

    let authToken = "";
    let result: boolean = true;
    // let auth = localStorage.getItem('auth');
    // if (auth != undefined || auth != null) {

    //     var authModel = JSON.parse(auth);
    //     authToken = authModel.Token;
    //     if (this.jwtHelper.isTokenExpired(authToken)) {

    //         result = false;
    //     }
    // }
    // else {
    //     result = false;
    // }

    return result;

  }

}
