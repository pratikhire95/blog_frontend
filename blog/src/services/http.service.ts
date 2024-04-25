import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public serverName = 'https://jsonplaceholder.typicode.com'; // To get server name

  private headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.createHeaders();
  }

  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  private getRequestOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  // To create the post for the particular user
  createPost(post: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/posts`, post, this.getRequestOptions());
  }

  // To get the Posts list
  getPost(): Observable<any> {
    return this.http.get(`${this.serverName}/posts`);
  }

  // To get the maintenance list
  getPostByUserId(userId: any): Observable<any> {
    return this.http.get(`${this.serverName}/posts/${userId}`);
  }

  // To get the hospital list
  getCommentsByPostId(postId: any): Observable<any> {
    return this.http.get(`${this.serverName}//comments?postId=${postId}`);
  }
}