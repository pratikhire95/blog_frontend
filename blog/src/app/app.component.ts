import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  IsLoggin: any = false;
  roleName: string | null;
  constructor(private authService: AuthService, private router: Router) {
    this.IsLoggin = authService.getLoginStatus;
    this.roleName = authService.getRole;
    if (this.IsLoggin == false) {
      this.router.navigateByUrl('/homepage');
    }
  }
  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
