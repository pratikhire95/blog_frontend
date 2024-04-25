import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { HttpService } from 'src/services/http.service';
 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  passwordStrength: string = '';
  passwordMessage:string='';
  emailReg:RegExp=/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]{2,}$/;
 
  pMessage=`1) At least one lowercase alphabet i.e. [a-z]\n
  2) At least one uppercase alphabet i.e. [A-Z]\n
  3) At least one Numeric digit i.e. [0-9]\n
  4) At least one special character i.e. ['@', '$', '.', '#', '!', '%', '*', '?', '&', '^']\n
  5) The total length must be minimum of 8 \n`;
 
 
  strengthColors: { [key: string]: string } = {
    'Password is Required.':'red',
    'Weak': 'red',
    'Medium': 'orange',
    'Strong': 'green'
  };
  itemForm: FormGroup;
  formModel: any = { role: "user", email: '', password: '', username: '' };
  userModel: any = { role: '', email: '', password: '', username: '' , confirmPassword: ''};
  showMessage: boolean = false;
  showError:boolean=false;
  responseMessage: any;
 
  constructor(public router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
 
    this.itemForm = this.formBuilder.group({
      username: [this.formModel.username, Validators.required],
      password: [this.formModel.password, [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$.#!%*?&^])[a-zA-Z0-9@$.#!%*?&^]+$')]],
      confirmPassword: [this.formModel.confirmPassword, [Validators.required]],
      email: [this.formModel.email, [Validators.required,Validators.pattern(this.emailReg)]],
      role: [this.formModel.role, Validators.required]},
      { validators: this.checkPasswords }
      );
     
 
}
 
   ngOnInit(): void {
   }
 
 
  onRegister() {
 
    // Call the service to register the user
    if (this.itemForm.valid) {
      this.userModel.role = this.itemForm.value.role;
      this.userModel.email = this.itemForm.value.email;
      this.userModel.username = this.itemForm.value.username;
      this.userModel.password = this.itemForm.value.password;

      this.showMessage = false;
      this.authService.register(this.itemForm.value.email,this.itemForm.value.password);
      this.itemForm.reset();
    }
    else {
      this.itemForm.markAllAsTouched();
    }
  }
 
 
 
 
  // Custom validator function to check if password and confirmPassword match
  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
 
    if (password !== confirmPassword || password==="") {
      group.get('confirmPassword')?.setErrors({ notSame: true });
    } else if(password===confirmPassword){
      group.get('confirmPassword')?.setErrors(null); // Clear error if passwords match
    }
  }
 
 
  checkPasswordStrength(): void {
    // Evaluate password strength based on criteria
    const password = this.itemForm.get('password')?.value;
    if (password === "") {
      this.passwordStrength = '';
      this.passwordMessage = '';
    } else if (password.length < 8) {
      this.passwordStrength = 'Weak'; // Password length out of range
      this.passwordMessage = this.pMessage;
    } else if (this.itemForm.get('password')?.hasError('pattern')) {
      this.passwordStrength = 'Medium'; // Missing one or more character types
      this.passwordMessage = this.pMessage;
    } else {
      this.passwordStrength = 'Strong'; // Password meets all criteria
      this.passwordMessage = '';
      console.log(this.passwordStrength);
    }
  }
 
 
}