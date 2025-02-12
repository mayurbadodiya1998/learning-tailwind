import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICredential, IUser } from './auth.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(params: ICredential): Observable<any> {
    let url = `${environment.apiUrl}auth/signup`;
    return this.http.post(url, params);
  }

  login(params: ICredential): Observable<any> {
    let url = `${environment.apiUrl}auth/login`;
    return this.http.post(url, params);
  }

  sendOtp(params: ICredential): Observable<any> {
    let url = `${environment.apiUrl}auth/send-otp`;
    return this.http.post(url, params);
  }

  verifyOtp(params: ICredential): Observable<any> {
    let url = `${environment.apiUrl}auth/verify-otp`;
    return this.http.post(url, params);
  }
}
