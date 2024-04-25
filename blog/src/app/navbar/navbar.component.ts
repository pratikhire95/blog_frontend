import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedin: boolean;
  constructor(private authService: AuthService, private router: Router) {
    // Initialize IsLoggin and roleName properties with AuthService
    // If the user is not logged in, redirect to the homepage
    if(localStorage.getItem('token') != null){
      this.isLoggedin = true
    }
    else{
      this.isLoggedin = false;
    }
  }

  // Method to handle user logout
  logout() {
    // Call AuthService logout method
    this.authService.logout();
    // Reload the page to clear user session data
  }
}
