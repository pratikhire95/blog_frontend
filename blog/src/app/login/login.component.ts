import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = {};
  showError: boolean = false;
  errorMessage: any;
  constructor(
    public router: Router,
    public httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.itemForm = this.formBuilder.group({
      username: [this.formModel.username, [Validators.required]],
      password: [this.formModel.password, [Validators.required]],
    });
  }

  ngOnInit(): void { }
  //to validate the login 
  onLogin() {
    if (this.itemForm.valid) {
      this.showError = false;
      this.httpService.Login(this.itemForm.value).subscribe(
        (data: any) => {
          if (data.userNo != 0) {
            // localStorage.setItem('role', data.role);
            this.authService.SetRole(data.role);
            this.authService.SetUsername(data.username);
            this.authService.saveToken(data.token);
            this.router.navigateByUrl('/homepage');

            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.showError = true;
            this.errorMessage = 'Wrong User or Password';
          }
        },
        (error) => {
          // Handle error
          this.showError = true;
          this.errorMessage =
            'An error occurred while logging in. Please try again later.';
          console.error('Login error:', error);
        }
      );
    } else {
      this.itemForm.markAllAsTouched();
    }
  }
  //to route to the registration
  registration() {
    this.router.navigateByUrl('/registration');
  }
}
