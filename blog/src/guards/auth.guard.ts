import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    // Get the role of the current user from the authentication service
    const token: any = localStorage.getItem('token');

    if (token == null) {
      this.router.navigate(['/login'])
      return false; // Allow access to the route
    } else {
      return true; // Deny access to the route
    }
  }


}
