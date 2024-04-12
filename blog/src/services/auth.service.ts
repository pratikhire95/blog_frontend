import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private isLoggedIn: boolean = false;

  constructor() {}

  // Method to save token received from login
  saveToken(token: string) {
    this.token = token;
    this.isLoggedIn = true;
    // Optionally, you can save the token to local storage or a cookie for persistence
    localStorage.setItem('token', token);
  }
  SetRole(role: any) {
    localStorage.setItem('role', role);
  }
  get getRole(): string | null {
    return localStorage.getItem('role');
  }


  SetUsername(username : any)
  {
    localStorage.setItem('username',username);
  }

  get getUsername():string | null{
    return localStorage.getItem('username');
  }
  // Method to retrieve login status
  get getLoginStatus(): boolean {
    return !!localStorage.getItem('token');
  }
  getToken(): string | null {
    this.token = localStorage.getItem('token');
    return this.token;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.token = null;
    this.isLoggedIn = false;
  }
}