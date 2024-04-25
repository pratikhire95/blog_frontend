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
  show: boolean = false;

  constructor(public router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.itemForm = this.formBuilder.group({
      email: [this.formModel.email, [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [this.formModel.password, [Validators.required]],
    });
  }

  ngOnInit(): void { }

  onload() {
    window.location.reload()
  }

  toggle() {
    const password = document.getElementById('password');
    const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
    password?.setAttribute('type', type);
  }

  onLogin() {
    if (this.itemForm.valid) {
      this.showError = false;
      this.authService.login(this.itemForm.value.email, this.itemForm.value.password);
      this.itemForm.reset();

    } else {
      // Form validation failed
      this.itemForm.markAllAsTouched();
    }
  }

  registration() {
    this.router.navigateByUrl('/registration');
  }

  signInWithGoogle() {
    this.authService.googleSignIn();
  }
}