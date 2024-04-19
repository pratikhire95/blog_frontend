import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public serverName = "http://127.0.0.1:8080"; // To get server name
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.createHeaders();
  }
  private createHeaders(): HttpHeaders {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    if (authToken) {
      headers = headers.set('Authorization', `Bearer ${authToken}`);
    }
    return headers;
  }

  private getRequestOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }
 

  //it will generate the authorization token while login and add to the header
  Login(details: any): Observable<any> {
    return this.http.post(
      this.serverName + '/api/v1/login',
      details,
      this.getRequestOptions()
    );
  }

  // register the user
  registerUser(details: any): Observable<any> {
    return this.http.post(
      this.serverName + '/api/v1/register',
      details,
      this.getRequestOptions()
    );
  }
}